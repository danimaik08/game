import MovableObject from '~/MovableObject';

import PlayerState from './PlayerState';

export default class PlayingState extends PlayerState {
  constructor(sprite: MovableObject) {
    super(sprite);
    this.stateName = 'playing';
  }

  public processMovement() {
    super.processMovement();
  }
  public addToNextRender() {
    super.addToNextRender();
  }
  public registerDamage() {
    super.registerDamage();
  }
  public attack() {
    super.attack();
  }
}
