import GameObject from '~/structs/GameObject';

import PlayerState from './PlayerState';

export default class PlayingAfterDamageState extends PlayerState {
  private static MAX_FRAMES_BEFORE_TOGGLE_IS_INVISIBLE_PLAYER = 5;
  private framesCount: number;
  private isInvisiblePlayer: boolean;

  constructor(gameObject: GameObject, health: number) {
    super(gameObject, health);
    this.stateName = 'playing-after-damage';
    this.framesCount = 0;
    this.isInvisiblePlayer = true;
  }

  public processMovement() {
    super.processMovement();
  }
  public addToNextRender() {
    if (!this.isInvisiblePlayer) {
      super.addToNextRender();
    }

    this.framesCount++;

    if (
      this.framesCount >=
      PlayingAfterDamageState.MAX_FRAMES_BEFORE_TOGGLE_IS_INVISIBLE_PLAYER
    ) {
      this.isInvisiblePlayer = !this.isInvisiblePlayer;
      this.framesCount = 0;
    }
  }
  public registerDamage() {}
  public attack() {}
}
