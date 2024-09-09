import KeyboardController from '~/KeyboardController';
import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import { PLAYER_ATTACK_DELAY, PLAYER_AFTER_DAMAGE_DURATION } from '~/consts';
import Speed from '~/Speed';
import BulletsCollider from '~/BulletsCollider';
import BulletsStore from '~/BulletsStore';
import Bullet from '~/Bullet';
import Lifebar from '~/Lifebar';

import * as Helper from './helper';
import { PlayerStateName } from './types';

export default class PlayerState {
  private static instance: PlayerState;
  private innerState: PlayerStateName;
  private keyboardController: KeyboardController;
  private sprite: MovableObject;
  private virtualDOM: VirtualDOM;
  private frameBehavior: () => void;
  private bulletsCollider: BulletsCollider;
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
      this.lastAttackTime = Date.now() - PLAYER_ATTACK_DELAY;
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
        break;
      }
      case 'playing': {
        this.sprite ??= Helper.createInitialSprite();
        this.bulletsCollider ??= new BulletsCollider(this.sprite, 'enemy');
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
          this.state = 'playing';
        }, PLAYER_AFTER_DAMAGE_DURATION);

        this.frameBehavior = () => {
          this.processMovement();
          this.addToNextRender();
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

  private processMovement() {
    this.sprite.speed = Helper.getSpeedByKeyboardsKeys(
      this.sprite,
      this.keyboardController
    );
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
      currentTime > this.lastAttackTime + PLAYER_ATTACK_DELAY;

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
