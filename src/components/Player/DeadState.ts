import GameObject from '~/structs/GameObject';

import PlayerState from './PlayerState';

export default class DeadState extends PlayerState {
  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
    this.stateName = 'dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
