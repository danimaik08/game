import GameObject from '~/structs/GameObject';

import EnemyState from './EnemyState';

export default class DeadState extends EnemyState {
  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
    this.stateName = 'dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
