import addId from '~/shared/addId';
import * as consts from '~/shared/consts';

export default class GameWindow {
  private static instance: GameWindow | null = null;

  private static init(): HTMLElement {
    const body = document.querySelector('body') as HTMLBodyElement;
    const root = document.createElement('div');
    const window = document.createElement('div');

    addId(root, consts.ROOT_ID);
    addId(window, consts.GAME_WINDOW_ID);

    body.appendChild(root);
    root.appendChild(window);

    return window;
  }

  private window: HTMLElement;

  constructor() {
    if (!GameWindow.instance) {
      this.window = GameWindow.init();

      GameWindow.instance = this;
    }

    return GameWindow.instance;
  }

  static destroy() {
    GameWindow.instance = null;
    document.body.innerHTML = '';
  }

  draw() {
    this.window;
  }
}
