import GameObject from '~/structs/GameObject';

import PlayerState from './PlayerState';

export default class PlayingAfterDamageState extends PlayerState {
  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
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
