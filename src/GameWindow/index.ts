import RenderAPI from '~/RenderAPI';

export default class GameWindow {
  private static instance: GameWindow | null = null;
  private renderAPI: RenderAPI | null = null;

  constructor(renderAPI: RenderAPI) {
    if (!GameWindow.instance) {
      this.renderAPI = renderAPI;
      this.renderAPI.renderGameWindow();

      GameWindow.instance = this;
    }

    return GameWindow.instance;
  }

  private handleErrorsForDestroy() {
    if (!process.env.WITH_TESTS) {
      throw new Error(
        'GameWindow Error: called method "destroy" (which for tests only!) not in tests'
      );
    }

    if (!this.renderAPI) {
      throw new Error(
        'GameWindow Error: called method "destroy" without adding of renderAPI'
      );
    }
  }

  public destroy() {
    this.handleErrorsForDestroy();
    this.renderAPI.clearAll();
    this.renderAPI = null;
    GameWindow.instance = null;
  }
}
