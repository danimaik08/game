import GameObject from '~/structs/GameObject';
import { ENEMY_AFTER_DAMAGE_DURATION, ENEMY_MAX_HEALTH } from '~/consts';

import * as Helper from './helper';
import { EnemyStateName } from './types';
import EnemyState from './EnemyState';
import BeforePlayingState from './BeforePlayingState';
import PlayingState from './PlayingState';
import PlayingAfterDamageState from './PlayingAfterDamageState';
import BeforeDeadState from './BeforeDeadState';
import DeadState from './DeadState';

export default class Enemy {
  private static instance: Enemy;
  private gameObject: GameObject;
  private timer: NodeJS.Timeout;
  private state: EnemyState;
  private stateNameBefore: EnemyStateName;
  private innerHealth: number;

  constructor() {
    if (!Enemy.instance) {
      this.stateNameBefore = 'before-playing';
      this.stateName = 'before-playing';

      Enemy.instance = this;
    }

    return Enemy.instance;
  }

  public init() {
    clearTimeout(this.timer);
    this.timer = null;
    this.innerHealth = ENEMY_MAX_HEALTH;
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
  private get stateName(): EnemyStateName {
    return this.state.stateName;
  }
  private set stateName(newState: EnemyStateName) {
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
          console.log('some action after damage');
          this.stateName = 'playing';
        }, ENEMY_AFTER_DAMAGE_DURATION);

        this.state = new PlayingAfterDamageState(this.gameObject, this.innerHealth);
        break;
      }
      case 'before-dead': {
        this.state = new BeforeDeadState(this.gameObject, this.innerHealth);
        this.timer = setTimeout(() => {
          this.stateName = 'dead';
        }, ENEMY_AFTER_DAMAGE_DURATION);
        break;
      }
      case 'dead': {
        this.state = new DeadState(this.gameObject, this.innerHealth);
        break;
      }
    }
  }
}
