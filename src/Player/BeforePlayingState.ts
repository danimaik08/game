import MovableObject from '~/MovableObject';

import PlayerState from './PlayerState';

export default class BeforePlayingState extends PlayerState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'before-playing';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
