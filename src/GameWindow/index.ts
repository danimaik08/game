import * as layoutAPI from './layoutAPI';

export default class GameWindow {
  private static instance: GameWindow | null = null;

  private windowLayout: object;

  constructor() {
    if (!GameWindow.instance) {
      layoutAPI.createInitLayout();

      this.windowLayout = layoutAPI.getGameWindow();

      GameWindow.instance = this;
    }

    return GameWindow.instance;
  }

  static destroy() {
    layoutAPI.clearLayout();
    GameWindow.instance = null;
  }

  draw() {
    this.windowLayout;
  }
}
