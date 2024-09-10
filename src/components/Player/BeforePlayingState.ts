import GameObject from '~/structs/GameObject';

import PlayerState from './PlayerState';

export default class BeforePlayingState extends PlayerState {
  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
    this.stateName = 'before-playing';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
