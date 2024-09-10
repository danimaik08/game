import MovableObject from '~/components/MovableObject';

import EnemyState from './EnemyState';

export default class BeforePlayingState extends EnemyState {
  constructor(sprite: MovableObject, health: number) {
    super(sprite, health);
    this.stateName = 'before-playing';
  }

  public processMovement() {}
  public addToNextRender() {}
  public registerDamage() {}
  public attack() {}
}
