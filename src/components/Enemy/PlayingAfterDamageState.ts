import GameObject from '~/structs/GameObject';

import EnemyState from './EnemyState';

export default class PlayingAfterDamageState extends EnemyState {
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
  public registerDamage() {
    super.registerDamage();
  }
  public attack() {
    super.attack();
  }
}
