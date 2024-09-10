import { ENEMY_ATTACK_DELAY, ENEMY_RECEIVING_DAMAGE } from '~/consts';
import GameObject from '~/structs/GameObject';
import VirtualDOM from '~/VirtualDOM';
import BulletsCollider from '~/colliders/BulletsCollider';
import BulletsStore from '~/stores/BulletsStore';

import * as Helper from './helper';
import { EnemyStateName } from './types';

export default abstract class EnemyState {
  protected gameObject: GameObject;
  protected virtualDOM: VirtualDOM;
  protected bulletsCollider: BulletsCollider;
  protected bulletsStore: BulletsStore;
  protected lastAttackTime: number;

  public health: number;
  public stateName: EnemyStateName;

  constructor(gameObject: GameObject, health: number) {
    this.gameObject = gameObject;
    this.virtualDOM = new VirtualDOM();
    this.bulletsCollider = new BulletsCollider(this.gameObject, 'player');
    this.bulletsStore = new BulletsStore();
    this.lastAttackTime = Date.now() - ENEMY_ATTACK_DELAY;
    this.stateName = 'before-playing';
    this.health = health;
  }

  public processMovement() {
    this.gameObject.speed = Helper.getSpeed(this.gameObject);
    this.gameObject.move();
  }
  public addToNextRender() {
    this.virtualDOM.addElement(this.gameObject);
  }
  public registerDamage() {
    this.bulletsCollider.tryToCollide(() => {
      this.health -= ENEMY_RECEIVING_DAMAGE;

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
      currentTime > this.lastAttackTime + ENEMY_ATTACK_DELAY;

    if (readyToAttack) {
      this.lastAttackTime = currentTime;
      this.bulletsStore.addElement(
        Helper.createBullet(this.gameObject.point, this.gameObject.size)
      );
    }
  }
}
