import MovableObject from '~/MovableObject';

import EnemyState from './EnemyState';

export default class BeforeDeadState extends EnemyState {
  constructor(sprite: MovableObject) {
    super(sprite);
    this.stateName = 'before-dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
