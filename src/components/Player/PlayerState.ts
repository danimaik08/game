import { PLAYER_ATTACK_DELAY, KEY_ATTACK } from '~/consts';
import VirtualDOM from '~/VirtualDOM';
import Bullet from '~/components/Bullet';
import Keyboard from '~/controllers/Keyboard';
import GameObject from '~/structs/GameObject';
import BulletsCollider from '~/components/BulletsCollider';
import BulletsStore from '~/components/BulletsStore';
import Speed from '~/structs/Speed';

import * as Helper from './helper';
import { PlayerStateName } from './types';

export default abstract class PlayerState {
  protected keyboardController: Keyboard;
  protected gameObject: GameObject;
  protected virtualDOM: VirtualDOM;
  protected bulletsCollider: BulletsCollider;
  protected bulletsStore: BulletsStore;
  protected lastAttackTime: number;

  public health: number;
  public stateName: PlayerStateName;

  constructor(gameObject: GameObject, health: number) {
    this.keyboardController = new Keyboard();
    this.gameObject = gameObject;
    this.virtualDOM = new VirtualDOM();
    this.bulletsCollider = new BulletsCollider(this.gameObject, 'enemy');
    this.bulletsStore = new BulletsStore();
    this.lastAttackTime = Date.now() - PLAYER_ATTACK_DELAY;
    this.stateName = 'before-playing';
    this.health = health;
  }

  public processMovement() {
    this.gameObject.speed = Helper.getSpeedByKeyboardsKeys(
      this.gameObject,
      this.keyboardController
    );
    this.gameObject.move();
  }
  public addToNextRender() {
    this.virtualDOM.addElement(this.gameObject);
  }
  public registerDamage() {
    this.bulletsCollider.tryToCollide(() => {
      this.health -= 1;

      if (this.health) {
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
        new Bullet('player', this.gameObject.point.clone(), new Speed(0, -4))
      );
    }
  }
}
