import { PLAYER_AFTER_DAMAGE_DURATION, PLAYER_MAX_HEALTH } from '~/consts';
import GameObject from '~/structs/GameObject';

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
  private gameObject: GameObject;
  private stateNameBefore: PlayerStateName;
  private innerHealth: number;

  constructor() {
    if (!Player.instance) {
      this.stateNameBefore = 'before-playing';
      this.stateName = 'before-playing';
      Player.instance = this;
    }

    return Player.instance;
  }

  public init() {
    clearTimeout(this.timer);
    this.timer = null;
    this.innerHealth = PLAYER_MAX_HEALTH;
    this.gameObject = Helper.createInitialGameObject();
    this.stateName = 'playing';
  }
  public doFrameBehavior() {
    this.state.processMovement();
    this.state.addToNextRender();
    this.state.registerDamage();
    this.state.attack();
    this.applyNewHealth();
    this.applyNewState();
  }

  private applyNewState() {
    if (this.stateName !== this.stateNameBefore) {
      this.stateNameBefore = this.state.stateName;
      this.stateName = this.state.stateName;
    }
  }
  private applyNewHealth() {
    this.innerHealth = this.state.health;
  }

  get health() {
    return this.innerHealth;
  }
  private get stateName(): PlayerStateName {
    return this.state.stateName ?? 'before-playing';
  }
  private set stateName(newState: PlayerStateName) {
    clearTimeout(this.timer);

    switch (newState) {
      case 'before-playing': {
        this.state = new BeforePlayingState(this.gameObject, this.innerHealth);
        break;
      }
      case 'playing': {
        this.state = new PlayingState(this.gameObject, this.innerHealth);
        break;
      }
      case 'playing-after-damage': {
        this.timer = setTimeout(() => {
          this.stateName = 'playing';
        }, PLAYER_AFTER_DAMAGE_DURATION);

        this.state = new PlayingAfterDamageState(this.gameObject, this.innerHealth);
        break;
      }
      case 'before-dead': {
        this.timer = setTimeout(() => {
          this.stateName = 'dead';
        }, 0);

        this.state = new BeforeDeadState(this.gameObject, this.innerHealth);
        break;
      }
      case 'dead': {
        this.state = new DeadState(this.gameObject, this.innerHealth);
        break;
      }
    }
  }
}
