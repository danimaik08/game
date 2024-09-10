import GameObject from '~/structs/GameObject';

import PlayerState from './PlayerState';

export default class PlayingState extends PlayerState {
  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
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
