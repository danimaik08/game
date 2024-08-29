import RenderAPI from '~/RenderAPI';
import getRenderAPI from '~/RenderAPI/getRenderAPI';

export default class GameWindow {
  private static instance: GameWindow | null = null;
  private static renderAPI: RenderAPI = getRenderAPI();

  constructor() {
    if (!GameWindow.instance) {
      GameWindow.renderAPI.renderGameWindow();

      GameWindow.instance = this;
    }

    return GameWindow.instance;
  }

  static destroy() {
    GameWindow.renderAPI.clearAll();
    GameWindow.instance = null;
  }
}
