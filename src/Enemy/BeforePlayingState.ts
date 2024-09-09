import MovableObject from '~/MovableObject';

import EnemyState from './EnemyState';

export default class BeforePlayingState extends EnemyState {
  constructor(sprite: MovableObject) {
    super(sprite);
    this.stateName = 'before-playing';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
