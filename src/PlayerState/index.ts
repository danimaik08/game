import KeyboardController from '~/KeyboardController';
import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import {
  GAME_WINDOW_WIDTH,
  GAME_WINDOW_HEIGHT,
  PLAYER_STATE_MIN_TOP,
  PLAYER_STATE_MOVEMENT_SPEED,
  PLAYER_STATE_ATTACK_DELAY,
  PLAYER_STATE_AFTER_DAMAGE_DURATION,
} from '~/consts';
import Speed from '~/Speed';
import BulletsCollider from '~/BulletsCollider';
import BulletsStore from '~/BulletsStore';
import Bullet from '~/Bullet';
import Lifebar from '~/Lifebar';

import errorOfSetState from './errorOfSetState';
import createInitialSprite from './createInitialSprite';
import { PlayerStateName } from './types';

export default class PlayerState {
  private static instance: PlayerState;
  private innerState: PlayerStateName;
  private keyboardController: KeyboardController;
  private sprite: MovableObject | null;
  private virtualDOM: VirtualDOM;
  private frameBehavior: () => void;
  private bulletsCollider: BulletsCollider | null;
  private bulletsStore: BulletsStore;
  private lastAttackTime: number;
  private timer: NodeJS.Timeout;
  private lifebar: Lifebar;

  constructor() {
    if (!PlayerState.instance) {
      this.state = 'before-playing';
      this.virtualDOM = new VirtualDOM();
      this.keyboardController = new KeyboardController();
      this.keyboardController.addEventListeners();
      this.sprite = null;
      this.bulletsCollider = null;
      this.bulletsStore = new BulletsStore();
      this.frameBehavior = () => {};
      this.lastAttackTime = Date.now() - PLAYER_STATE_ATTACK_DELAY;
      this.timer = null;
      this.lifebar = new Lifebar();

      PlayerState.instance = this;
    }

    return PlayerState.instance;
  }

  get state(): PlayerStateName {
    return this.innerState;
  }
  set state(newState: PlayerStateName) {
    switch (newState) {
      case 'before-playing': {
        this.sprite = null;
        this.bulletsCollider = null;
        this.frameBehavior = () => {};
        break;
      }
      case 'playing-first': {
        this.sprite = createInitialSprite();
        this.bulletsCollider = new BulletsCollider(this.sprite, 'enemy');
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
          this.state = 'playing';
        }, PLAYER_STATE_AFTER_DAMAGE_DURATION);

        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
        };
        break;
      }
      case 'before-dead': {
        errorOfSetState(
          ['playing-first', 'playing', 'playing-after-damage', 'before-dead'],
          this.innerState
        );

        this.frameBehavior = () => {};
        this.state = 'dead';
        break;
      }
      case 'dead': {
        this.sprite = null;
        this.frameBehavior = () => {};
        break;
      }
    }

    this.innerState = newState;
  }

  private getSpeedByKeyboardsKeys(): Speed {
    const needPreventTop = this.sprite.point.y <= PLAYER_STATE_MIN_TOP;
    const needPreventLeft = this.sprite.point.x <= 0;
    const needPreventBottom =
      this.sprite.point.y >= GAME_WINDOW_HEIGHT - this.sprite.size.height;
    const needPreventRight =
      this.sprite.point.x >= GAME_WINDOW_WIDTH - this.sprite.size.width;

    let speedX = 0;
    let speedY = 0;

    if (
      this.keyboardController.isActiveKey(process.env.KEY_TOP) &&
      !needPreventTop
    ) {
      speedY = -PLAYER_STATE_MOVEMENT_SPEED;
    }
    if (
      this.keyboardController.isActiveKey(process.env.KEY_LEFT) &&
      !needPreventLeft
    ) {
      speedX = -PLAYER_STATE_MOVEMENT_SPEED;
    }
    if (
      this.keyboardController.isActiveKey(process.env.KEY_BOTTOM) &&
      !needPreventBottom
    ) {
      speedY = PLAYER_STATE_MOVEMENT_SPEED;
    }
    if (
      this.keyboardController.isActiveKey(process.env.KEY_RIGHT) &&
      !needPreventRight
    ) {
      speedX = PLAYER_STATE_MOVEMENT_SPEED;
    }

    return new Speed(speedX, speedY);
  }

  private processMovement() {
    this.sprite.speed = this.getSpeedByKeyboardsKeys();
    this.sprite.move();
  }
  private addToNextRender() {
    this.virtualDOM.addElement(this.sprite);
  }
  private registerDamage() {
    this.bulletsCollider.tryToCollide(() => {
      this.lifebar.playerHealth -= 1;

      if (this.lifebar.playerHealth) {
        this.state = 'playing-after-damage';
      } else {
        this.state = 'before-dead';
      }
    });
  }
  private attack() {
    const currentTime = Date.now();
    const readyToAttack =
      currentTime > this.lastAttackTime + PLAYER_STATE_ATTACK_DELAY;

    if (
      readyToAttack &&
      this.keyboardController.isActiveKey(process.env.KEY_ATTACK)
    ) {
      this.lastAttackTime = currentTime;
      this.bulletsStore.addElement(
        new Bullet('player', this.sprite.point.clone(), new Speed(0, -4))
      );
    }
  }

  public doFrameBehavior() {
    this.frameBehavior();
  }
}
