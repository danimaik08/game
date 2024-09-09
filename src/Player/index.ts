import { PLAYER_AFTER_DAMAGE_DURATION } from '~/consts';
import MovableObject from '~/MovableObject';

import { PlayerStateName } from './types';
import * as Helper from './helper';
import PlayerState from './PlayerState';
import BeforePlayingState from './BeforePlayingState';
import PlayingState from './PlayingState';
import PlayingAfterDamageState from './PlayingAfterDamageState';
import BeforeDeadState from './BeforeDeadState';
import DeadState from './DeadState';

export default class Player {
  private static instance: Player;
  private timer: NodeJS.Timeout;
  private state: PlayerState;
  private sprite: MovableObject;

  constructor() {
    if (!Player.instance) {
      this.timer = null;
      this.sprite = Helper.createInitialSprite();
      Player.instance = this;
    }

    return Player.instance;
  }

  get stateName(): PlayerStateName {
    return this.state.stateName ?? 'before-playing';
  }
  set stateName(newState: PlayerStateName) {
    switch (newState) {
      case 'before-playing': {
        this.state = new BeforePlayingState(this.sprite);
        break;
      }
      case 'playing': {
        this.state = new PlayingState(this.sprite);
        break;
      }
      case 'playing-after-damage': {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          this.stateName = 'playing';
        }, PLAYER_AFTER_DAMAGE_DURATION);

        this.state = new PlayingAfterDamageState(this.sprite);
        break;
      }
      case 'before-dead': {
        this.state = new BeforeDeadState(this.sprite);
        this.stateName = 'dead';
        break;
      }
      case 'dead': {
        this.state = new DeadState(this.sprite);
        break;
      }
    }

    this.state.stateName = newState;
  }

  private applyNewState() {
    this.stateName = this.state.stateName;
  }

  public doFrameBehavior() {
    this.state.processMovement();
    this.state.addToNextRender();
    this.state.registerDamage();
    this.state.attack();
    this.applyNewState();
  }
}
