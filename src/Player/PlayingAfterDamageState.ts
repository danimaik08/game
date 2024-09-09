import MovableObject from '~/MovableObject';

import PlayerState from './PlayerState';

export default class PlayingAfterDamageState extends PlayerState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'playing-after-damage';
  }

  public processMovement() {
    super.processMovement();
  }
  public addToNextRender() {
    super.addToNextRender();
  }
  public registerDamage() {}
  public attack() {}
}
