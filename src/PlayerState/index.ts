import KeyboardController from '~/KeyboardController';
import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import { Direction } from '~/MovableObject/types';
import {
  GAME_WINDOW_WIDTH,
  GAME_WINDOW_HEIGHT,
  PLAYER_STATE_MIN_TOP,
} from '~/consts';

import errorOfSetState from './errorOfSetState';
import createInitialSprite from './createInitialSprite';
import { PlayerStateName } from './types';

export default class PlayerState {
  private static instance: PlayerState;
  private innerState: PlayerStateName;
  private keyboardController: KeyboardController;
  private sprite: MovableObject | null;
  private virtualDOM: VirtualDOM;
  private frameBehavior: Array<'addToNextRender' | 'processMovement'>;

  constructor() {
    if (!PlayerState.instance) {
      this.state = 'before-playing';
      this.virtualDOM = new VirtualDOM();
      this.keyboardController = new KeyboardController();
      this.keyboardController.addEventListeners();
      this.sprite = null;
      this.frameBehavior = [];

      PlayerState.instance = this;
    }

    return PlayerState.instance;
  }

  get state(): PlayerStateName {
    return this.innerState;
  }
  set state(newState: PlayerStateName) {
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

  private processKeyboardDirectionsKeys(): Direction[] {
    const directions: Direction[] = [];

    const needPreventTop = this.sprite.point.y <= PLAYER_STATE_MIN_TOP;
    const needPreventLeft = this.sprite.point.x <= 0;
    const needPreventBottom =
      this.sprite.point.y >= GAME_WINDOW_HEIGHT - this.sprite.size.height;
    const needPreventRight =
      this.sprite.point.x >= GAME_WINDOW_WIDTH - this.sprite.size.width;

    if (
      this.keyboardController.isActiveKey(process.env.KEY_TOP) &&
      !needPreventTop
    ) {
      directions.push('top');
    }
    if (
      this.keyboardController.isActiveKey(process.env.KEY_LEFT) &&
      !needPreventLeft
    ) {
      directions.push('left');
    }
    if (
      this.keyboardController.isActiveKey(process.env.KEY_BOTTOM) &&
      !needPreventBottom
    ) {
      directions.push('bottom');
    }
    if (
      this.keyboardController.isActiveKey(process.env.KEY_RIGHT) &&
      !needPreventRight
    ) {
      directions.push('right');
    }

    return directions;
  }

  private processMovement() {
    this.sprite.moveTo(this.processKeyboardDirectionsKeys());
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
