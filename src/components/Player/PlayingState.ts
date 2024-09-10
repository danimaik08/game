import MovableObject from '~/components/MovableObject';

import PlayerState from './PlayerState';

export default class PlayingState extends PlayerState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
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
