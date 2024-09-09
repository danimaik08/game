import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import {
  ENEMY_AFTER_DAMAGE_DURATION,
  ENEMY_ATTACK_DELAY,
  ENEMY_RECEIVING_DAMAGE,
} from '~/consts';
import BulletsCollider from '~/BulletsCollider';
import BulletsStore from '~/BulletsStore';
import Lifebar from '~/Lifebar';

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
      this.lastAttackTime = Date.now() - ENEMY_ATTACK_DELAY;
      this.bulletsStore = new BulletsStore();
      this.timer = null;
      this.lifebar = new Lifebar();

      EnemyState.instance = this;
    }

    return EnemyState.instance;
  }

  private processMovement() {
    this.sprite.speed = Helper.getSpeed(this.sprite);
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
      currentTime > this.lastAttackTime + ENEMY_ATTACK_DELAY;

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
        break;
      }
      case 'playing': {
        this.sprite ??= Helper.createInitialSprite();
        this.bulletsCollider ??= new BulletsCollider(this.sprite, 'player');
        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
          this.registerDamage();
          this.attack();
        };
        break;
      }
      case 'playing-after-damage': {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log('some action after damage');
          this.state = 'playing';
        }, ENEMY_AFTER_DAMAGE_DURATION);

        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
          this.registerDamage();
          this.attack();
        };
        break;
      }
      case 'before-dead': {
        this.frameBehavior = () => {};
        this.state = 'dead';
        break;
      }
      case 'dead': {
        this.frameBehavior = () => {};
        break;
      }
    }

    this.innerState = newState;
  }

  public doFrameBehavior() {
    this.frameBehavior();
  }
}
