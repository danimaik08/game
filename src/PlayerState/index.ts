import KeyboardController from '~/KeyboardController';
import Point from '~/Point';
import Size from '~/Size';
import Speed from '~/Speed';
import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/MovableObject';
import { Direction } from '~/MovableObject/types';

import errorOfSetState from './errorOfSetState';
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
        this.sprite = new MovableObject(
          new Point(380, 500),
          new Size(40, 40),
          new Speed(2, 2),
          'red'
        );
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

  private processMovement() {
    const directions: Direction[] = [];

    if (this.keyboardController.isActiveKey(process.env.KEY_TOP)) {
      directions.push('top');
    }
    if (this.keyboardController.isActiveKey(process.env.KEY_LEFT)) {
      directions.push('left');
    }
    if (this.keyboardController.isActiveKey(process.env.KEY_BOTTOM)) {
      directions.push('bottom');
    }
    if (this.keyboardController.isActiveKey(process.env.KEY_RIGHT)) {
      directions.push('right');
    }

    this.sprite.moveTo(directions);
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
