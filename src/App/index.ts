import RenderAPI from '~/RenderAPI';
import GameWindow from '~/GameWindow';
import GameLoop from '~/GameLoop';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;

  constructor(renderAPI: RenderAPI) {
    if (!App.instance) {
      this.renderAPI = renderAPI;
      this.gameLoop = new GameLoop();
      App.instance = this;
    }

    return App.instance;
  }

  public start() {
    const gameWindow = new GameWindow(this.renderAPI);

    gameWindow.render();
    this.gameLoop.start(() => {});
  }
}
