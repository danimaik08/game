import MovableObject from '~/MovableObject';

import EnemyState from './EnemyState';

export default class PlayingAfterDamageState extends EnemyState {
  constructor(sprite: MovableObject) {
    super(sprite);
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
