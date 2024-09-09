import MovableObject from '~/MovableObject';

import PlayerState from './PlayerState';

export default class BeforeDeadState extends PlayerState {
  constructor(sprite: MovableObject) {
    super(sprite);
    this.stateName = 'before-dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
