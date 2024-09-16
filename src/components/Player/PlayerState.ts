import { PLAYER_ATTACK_DELAY } from '~/consts';
import VirtualDOM from '~/VirtualDOM';
import Bullet from '~/components/Bullet';
import GameObject from '~/structs/GameObject';
import BulletsCollider from '~/colliders/BulletsCollider';
import BulletsStore from '~/stores/BulletsStore';
import Speed from '~/structs/Speed';
import KeyboardFacade from '~/controllers/keyboard';

import * as Helper from './helper';
import { PlayerStateName } from './types';

export default abstract class PlayerState {
  protected keyboard: KeyboardFacade;
  protected gameObject: GameObject;
  protected virtualDOM: VirtualDOM;
  protected bulletsCollider: BulletsCollider;
  protected bulletsStore: BulletsStore;
  protected lastAttackTime: number;

  public health: number;
  public stateName: PlayerStateName;

  constructor(gameObject: GameObject, health: number) {
    this.keyboard = new KeyboardFacade();
    this.gameObject = gameObject;
    this.virtualDOM = new VirtualDOM();
    this.bulletsCollider = new BulletsCollider(this.gameObject, 'enemy');
    this.bulletsStore = new BulletsStore();
    this.lastAttackTime = Date.now() - PLAYER_ATTACK_DELAY;
    this.stateName = 'before-playing';
    this.health = health;
  }

  public processMovement() {
    this.gameObject.speed = Helper.getSpeedByKeyboardsKeys(this.gameObject, this.keyboard);
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
    const readyToAttack = currentTime > this.lastAttackTime + PLAYER_ATTACK_DELAY;

    if (readyToAttack && this.keyboard.isActiveKey('ATTACK')) {
      this.lastAttackTime = currentTime;
      this.bulletsStore.addElement(new Bullet('player', this.gameObject.point.clone(), new Speed(0, -4)));
    }
  }
}
