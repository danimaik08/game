import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import {
  GAME_WINDOW_WIDTH,
  ENEMY_LEFT_BORDER,
  ENEMY_RIGHT_BORDER,
} from '~/consts';

import errorOfSetState from './errorOfSetState';
import createInitialSprite from './createInitialSprite';
import { EnemyStateName } from './types';
import Speed from '~/Speed';

export default class EnemyState {
  private static instance: EnemyState;
  private innerState: EnemyStateName;
  private sprite: MovableObject | null;
  private virtualDOM: VirtualDOM;
  private frameBehavior: Array<'addToNextRender' | 'processMovement'>;

  constructor() {
    if (!EnemyState.instance) {
      this.state = 'before-playing';
      this.virtualDOM = new VirtualDOM();
      this.sprite = null;
      this.frameBehavior = [];

      EnemyState.instance = this;
    }

    return EnemyState.instance;
  }

  get state(): EnemyStateName {
    return this.innerState;
  }
  set state(newState: EnemyStateName) {
    switch (newState) {
      case 'before-playing': {
        this.sprite = null;
        this.frameBehavior = [];
        break;
      }
      case 'playing-first': {
        this.sprite = createInitialSprite();
        this.frameBehavior = ['processMovement', 'addToNextRender'];
        break;
      }
      case 'playing': {
        errorOfSetState(['playing-first'], this.innerState);

        this.frameBehavior = ['processMovement', 'addToNextRender'];
        break;
      }
      case 'playing-after-damage': {
        errorOfSetState(['playing-first', 'playing'], this.innerState);

        this.frameBehavior = ['processMovement', 'addToNextRender'];
        break;
      }
      case 'before-dead': {
        errorOfSetState(
          ['playing-first', 'playing', 'playing-after-damage'],
          this.innerState
        );

        this.frameBehavior = ['processMovement', 'addToNextRender'];
        break;
      }
      case 'dead': {
        errorOfSetState(['before-dead'], this.innerState);

        this.sprite = null;
        break;
      }
    }

    this.innerState = newState;
  }

  private getSpeed(): Speed {
    const needPreventLeft = this.sprite.point.x <= ENEMY_LEFT_BORDER;

    let speedX = this.sprite.speed.x;

    if (needPreventLeft) {
      speedX = Math.abs(speedX);
      return new Speed(speedX, this.sprite.speed.y);
    }

    const needPreventRight =
      this.sprite.point.x >=
      GAME_WINDOW_WIDTH - ENEMY_RIGHT_BORDER - this.sprite.size.width;

    if (needPreventRight) {
      speedX = -Math.abs(speedX);
      return new Speed(speedX, this.sprite.speed.y);
    }

    return this.sprite.speed;
  }

  private processMovement() {
    this.sprite.speed = this.getSpeed();
    this.sprite.move();
  }
  private addToNextRender() {
    this.virtualDOM.addElement(this.sprite);
  }

  public doFrameBehavior() {
    this.frameBehavior.forEach((funcName) => {
      this[funcName]();
    });
  }
}
