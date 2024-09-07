import RenderAPI from '~/RenderAPI';
import GameWindow from '~/GameWindow';
import GameLoop from '~/GameLoop';
import getRenderAPI from '~/RenderAPI/getRenderAPI';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;

  constructor() {
    if (!App.instance) {
      this.renderAPI = getRenderAPI();
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
