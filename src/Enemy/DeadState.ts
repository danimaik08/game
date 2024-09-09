import MovableObject from '~/MovableObject';

import EnemyState from './EnemyState';

export default class DeadState extends EnemyState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
