import MovableObject from '~/MovableObject';

import EnemyState from './EnemyState';

export default class BeforeDeadState extends EnemyState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'before-dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
