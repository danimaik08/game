import { PLAYER_ATTACK_DELAY, KEY_ATTACK } from '~/consts';
import Bullet from '~/Bullet';
import Speed from '~/Speed';
import KeyboardController from '~/KeyboardController';
import MovableObject from '~/MovableObject';
import VirtualDOM from '~/VirtualDOM';
import BulletsCollider from '~/BulletsCollider';
import Lifebar from '~/Lifebar';

import * as Helper from './helper';
import { PlayerStateName } from './types';
import BulletsStore from '~/BulletsStore';

export default abstract class PlayerState {
  protected keyboardController: KeyboardController;
  protected sprite: MovableObject;
  protected virtualDOM: VirtualDOM;
  protected bulletsCollider: BulletsCollider;
  protected bulletsStore: BulletsStore;
  protected lifebar: Lifebar;
  protected lastAttackTime: number;

  public stateName: PlayerStateName;

  constructor(sprite: MovableObject) {
    this.keyboardController = new KeyboardController();
    this.keyboardController.addEventListeners();
    this.sprite = sprite;
    this.virtualDOM = new VirtualDOM();
    this.bulletsCollider = new BulletsCollider(this.sprite, 'enemy');
    this.bulletsStore = new BulletsStore();
    this.lifebar = new Lifebar();
    this.lastAttackTime = Date.now() - PLAYER_ATTACK_DELAY;
    this.stateName = 'before-playing';
  }

  public processMovement() {
    this.sprite.speed = Helper.getSpeedByKeyboardsKeys(
      this.sprite,
      this.keyboardController
    );
    this.sprite.move();
  }
  public addToNextRender() {
    this.virtualDOM.addElement(this.sprite);
  }
  public registerDamage() {
    this.bulletsCollider.tryToCollide(() => {
      this.lifebar.playerHealth -= 1;

      if (this.lifebar.playerHealth) {
        this.stateName = 'playing-after-damage';
      } else {
        this.stateName = 'before-dead';
      }
    });
  }
  public attack() {
    const currentTime = Date.now();
    const readyToAttack =
      currentTime > this.lastAttackTime + PLAYER_ATTACK_DELAY;

    if (readyToAttack && this.keyboardController.isActiveKey(KEY_ATTACK)) {
      this.lastAttackTime = currentTime;
      this.bulletsStore.addElement(
        new Bullet('player', this.sprite.point.clone(), new Speed(0, -4))
      );
    }
  }
}
