import MovableObject from '~/components/MovableObject';

import PlayerState from './PlayerState';

export default class DeadState extends PlayerState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'dead';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
