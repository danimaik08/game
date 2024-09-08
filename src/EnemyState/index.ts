import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import { Direction } from '~/MovableObject/types';
import {
  GAME_WINDOW_WIDTH,
  ENEMY_LEFT_BORDER,
  ENEMY_RIGHT_BORDER,
} from '~/consts';

import errorOfSetState from './errorOfSetState';
import createInitialSprite from './createInitialSprite';
import { EnemyStateName } from './types';

export default class EnemyState {
  private static instance: EnemyState;
  private innerState: EnemyStateName;
  private sprite: MovableObject | null;
  private virtualDOM: VirtualDOM;
  private movementDirection: 'left' | 'right' | null;
  private frameBehavior: Array<'addToNextRender' | 'processMovement'>;

  constructor() {
    if (!EnemyState.instance) {
      this.state = 'before-playing';
      this.virtualDOM = new VirtualDOM();
      this.sprite = null;
      this.movementDirection = null;
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
        this.movementDirection = null;
        break;
      }
      case 'playing-first': {
        this.sprite = createInitialSprite();
        this.frameBehavior = ['processMovement', 'addToNextRender'];
        this.movementDirection = 'left';
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

  private getDirections(): Direction[] {
    const needPreventLeft = this.sprite.point.x <= ENEMY_LEFT_BORDER;

    if (this.movementDirection === 'left') {
      this.movementDirection = needPreventLeft ? 'right' : 'left';
      return [this.movementDirection];
    }

    const needPreventRight =
      this.sprite.point.x >=
      GAME_WINDOW_WIDTH - ENEMY_RIGHT_BORDER - this.sprite.size.width;

    if (this.movementDirection === 'right') {
      this.movementDirection = needPreventRight ? 'left' : 'right';
      return [this.movementDirection];
    }

    return [];
  }

  private processMovement() {
    this.sprite.moveTo(this.getDirections());
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
