import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import {
  GAME_WINDOW_WIDTH,
  ENEMY_LEFT_BORDER,
  ENEMY_RIGHT_BORDER,
  ENEMY_STATE_AFTER_DAMAGE_DURATION,
  ENEMY_STATE_ATTACK_DELAY,
  ENEMY_RECEIVING_DAMAGE,
} from '~/consts';
import Speed from '~/Speed';
import BulletsCollider from '~/BulletsCollider';
import BulletsStore from '~/BulletsStore';
import Lifebar from '~/Lifebar';

import errorOfSetState from './errorOfSetState';
import * as Helper from './helper';
import { EnemyStateName } from './types';

export default class EnemyState {
  private static instance: EnemyState;
  private innerState: EnemyStateName;
  private sprite: MovableObject;
  private virtualDOM: VirtualDOM;
  private frameBehavior: () => void;
  private bulletsCollider: BulletsCollider;
  private lastAttackTime: number;
  private bulletsStore: BulletsStore;
  private timer: NodeJS.Timeout;
  private lifebar: Lifebar;

  constructor() {
    if (!EnemyState.instance) {
      this.state = 'before-playing';
      this.virtualDOM = new VirtualDOM();
      this.sprite = null;
      this.bulletsCollider = null;
      this.frameBehavior = () => {};
      this.lastAttackTime = Date.now() - ENEMY_STATE_ATTACK_DELAY;
      this.bulletsStore = new BulletsStore();
      this.timer = null;
      this.lifebar = new Lifebar();

      EnemyState.instance = this;
    }

    return EnemyState.instance;
  }

  private getSpeed(): Speed {
    const needPreventLeft = this.sprite.point.x <= ENEMY_LEFT_BORDER;

    let speedX = this.sprite.speed.x;

    if (needPreventLeft) {
      speedX = Math.abs(speedX);
      return new Speed(speedX, this.sprite.speed.y);
    }

    const needPreventRight =
      this.sprite.point.x >=
      GAME_WINDOW_WIDTH - ENEMY_RIGHT_BORDER - this.sprite.size.width;

    if (needPreventRight) {
      speedX = -Math.abs(speedX);
      return new Speed(speedX, this.sprite.speed.y);
    }

    return this.sprite.speed;
  }

  private processMovement() {
    this.sprite.speed = this.getSpeed();
    this.sprite.move();
  }
  private addToNextRender() {
    this.virtualDOM.addElement(this.sprite);
  }
  private registerDamage() {
    this.bulletsCollider.tryToCollide(() => {
      this.lifebar.enemyHealth -= ENEMY_RECEIVING_DAMAGE;

      if (this.lifebar.enemyHealth) {
        this.state = 'playing-after-damage';
      } else {
        this.state = 'before-dead';
      }
    });
  }
  private attack() {
    const currentTime = Date.now();
    const readyToAttack =
      currentTime > this.lastAttackTime + ENEMY_STATE_ATTACK_DELAY;

    if (readyToAttack) {
      this.lastAttackTime = currentTime;
      this.bulletsStore.addElement(Helper.createBullet(this.sprite));
    }
  }

  get state(): EnemyStateName {
    return this.innerState;
  }
  set state(newState: EnemyStateName) {
    switch (newState) {
      case 'before-playing': {
        this.sprite = null;
        this.bulletsCollider = null;
        this.frameBehavior = () => {};
        break;
      }
      case 'playing-first': {
        this.sprite = Helper.createInitialSprite();
        this.bulletsCollider = new BulletsCollider(this.sprite, 'player');
        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
          this.registerDamage();
          this.attack();
        };
        break;
      }
      case 'playing': {
        errorOfSetState(['playing-after-damage', 'playing'], this.innerState);

        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
          this.registerDamage();
          this.attack();
        };
        break;
      }
      case 'playing-after-damage': {
        errorOfSetState(
          ['playing-first', 'playing', 'playing-after-damage'],
          this.innerState
        );

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log('some action after damage');
          this.state = 'playing';
        }, ENEMY_STATE_AFTER_DAMAGE_DURATION);

        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
          this.registerDamage();
          this.attack();
        };
        break;
      }
      case 'before-dead': {
        errorOfSetState(
          ['playing-first', 'playing', 'playing-after-damage'],
          this.innerState
        );

        this.frameBehavior = () => {};
        this.state = 'dead';
        break;
      }
      case 'dead': {
        this.frameBehavior = () => {};
        this.sprite = null;
        break;
      }
    }

    this.innerState = newState;
  }

  public doFrameBehavior() {
    this.frameBehavior();
  }
}
