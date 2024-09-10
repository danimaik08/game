import { ENEMY_ATTACK_DELAY, ENEMY_RECEIVING_DAMAGE } from '~/consts';
import MovableObject from '~/components/MovableObject';
import VirtualDOM from '~/VirtualDOM';
import BulletsCollider from '~/components/BulletsCollider';
import BulletsStore from '~/components/BulletsStore';

import * as Helper from './helper';
import { EnemyStateName } from './types';

export default abstract class EnemyState {
  protected sprite: MovableObject;
  protected virtualDOM: VirtualDOM;
  protected bulletsCollider: BulletsCollider;
  protected bulletsStore: BulletsStore;
  protected lastAttackTime: number;

  public health: number;
  public stateName: EnemyStateName;

  constructor(sprite: MovableObject, health: number) {
    this.sprite = sprite;
    this.virtualDOM = new VirtualDOM();
    this.bulletsCollider = new BulletsCollider(this.sprite, 'player');
    this.bulletsStore = new BulletsStore();
    this.lastAttackTime = Date.now() - ENEMY_ATTACK_DELAY;
    this.stateName = 'before-playing';
    this.health = health;
  }

  public processMovement() {
    this.sprite.speed = Helper.getSpeed(this.sprite);
    this.sprite.move();
  }
  public addToNextRender() {
    this.virtualDOM.addElement(this.sprite);
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
      this.bulletsStore.addElement(Helper.createBullet(this.sprite));
    }
  }
}
