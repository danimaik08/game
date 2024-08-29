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
    if (!process.env.WITH_TESTS) {
      throw new Error(
        'GameWindow Error: called method "destroy" (which for tests only!) not in tests'
      );
    }

    if (!GameWindow.instance) {
      throw new Error(
        'GameWindow Error: called method "destroy" without instance'
      );
    }

    if (!GameWindow.renderAPI) {
      throw new Error(
        'GameWindow Error: called method "destroy" without adding of renderAPI'
      );
    }

    GameWindow.renderAPI.clearAll();
    GameWindow.instance = null;
  }
}
