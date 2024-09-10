import GameObject from '~/structs/GameObject';

import EnemyState from './EnemyState';

export default class BeforeDeadState extends EnemyState {
  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
    this.stateName = 'before-dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
