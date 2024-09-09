import MovableObject from '~/MovableObject';
import { ENEMY_AFTER_DAMAGE_DURATION } from '~/consts';

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
  private sprite: MovableObject;
  private timer: NodeJS.Timeout;
  private state: EnemyState;
  private stateNameBefore: EnemyStateName;

  constructor() {
    if (!Enemy.instance) {
      this.sprite = Helper.createInitialSprite();
      this.state = new BeforePlayingState(this.sprite);
      this.stateNameBefore = this.state.stateName;
      this.timer = null;

      Enemy.instance = this;
    }

    return Enemy.instance;
  }

  get stateName(): EnemyStateName {
    return this.state.stateName;
  }
  set stateName(newState: EnemyStateName) {
    switch (newState) {
      case 'before-playing': {
        break;
      }
      case 'playing': {
        this.state = new PlayingState(this.sprite);
        break;
      }
      case 'playing-after-damage': {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log('some action after damage');
          this.stateName = 'playing';
        }, ENEMY_AFTER_DAMAGE_DURATION);

        this.state = new PlayingAfterDamageState(this.sprite);
        break;
      }
      case 'before-dead': {
        this.state = new BeforeDeadState(this.sprite);
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.stateName = 'dead';
        }, ENEMY_AFTER_DAMAGE_DURATION);
        break;
      }
      case 'dead': {
        this.state = new DeadState(this.sprite);
        break;
      }
    }
  }

  private applyNewState() {
    if (this.stateName !== this.stateNameBefore) {
      this.stateNameBefore = this.state.stateName;
      this.stateName = this.state.stateName;
    }
  }

  public doFrameBehavior() {
    this.state.processMovement();
    this.state.addToNextRender();
    this.state.registerDamage();
    this.state.attack();
    this.applyNewState();
  }
}
