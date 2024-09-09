import MovableObject from '~/MovableObject';

import EnemyState from './EnemyState';

export default class DeadState extends EnemyState {
  constructor(sprite: MovableObject) {
    super(sprite);
    this.stateName = 'dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
