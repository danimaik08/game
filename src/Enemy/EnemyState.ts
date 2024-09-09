import { ENEMY_ATTACK_DELAY, ENEMY_RECEIVING_DAMAGE } from '~/consts';
import MovableObject from '~/MovableObject';
import VirtualDOM from '~/VirtualDOM';
import BulletsCollider from '~/BulletsCollider';
import Lifebar from '~/Lifebar';
import BulletsStore from '~/BulletsStore';

import * as Helper from './helper';
import { EnemyStateName } from './types';

export default abstract class EnemyState {
  protected sprite: MovableObject;
  protected virtualDOM: VirtualDOM;
  protected bulletsCollider: BulletsCollider;
  protected bulletsStore: BulletsStore;
  protected lifebar: Lifebar;
  protected lastAttackTime: number;

  public stateName: EnemyStateName;

  constructor(sprite: MovableObject) {
    this.sprite = sprite;
    this.virtualDOM = new VirtualDOM();
    this.bulletsCollider = new BulletsCollider(this.sprite, 'player');
    this.bulletsStore = new BulletsStore();
    this.lifebar = new Lifebar();
    this.lastAttackTime = Date.now() - ENEMY_ATTACK_DELAY;
    this.stateName = 'before-playing';
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
      this.lifebar.enemyHealth -= ENEMY_RECEIVING_DAMAGE;

      if (this.lifebar.enemyHealth) {
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
