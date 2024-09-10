import GameObject from '~/structs/GameObject';

import EnemyState from './EnemyState';

export default class PlayingState extends EnemyState {
  constructor(sprite: GameObject, health: number) {
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
