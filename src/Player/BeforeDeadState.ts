import MovableObject from '~/MovableObject';

import PlayerState from './PlayerState';

export default class BeforeDeadState extends PlayerState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'before-dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
