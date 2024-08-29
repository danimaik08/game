import RenderAPI from '~/RenderAPI';

export default class GameWindow {
  private static instance: GameWindow | null = null;
  private static renderAPI: RenderAPI | null = null;

  constructor(renderAPI: RenderAPI) {
    if (!GameWindow.instance) {
      GameWindow.renderAPI = renderAPI;
      GameWindow.renderAPI.renderGameWindow();

      GameWindow.instance = this;
    }

    return GameWindow.instance;
  }

  static destroy() {
    if (GameWindow.instance) {
      GameWindow.renderAPI.clearAll();
      GameWindow.instance = null;
    }
  }
}
