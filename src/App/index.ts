import RenderAPI from '~/RenderAPI';
import GameWindow from '~/GameWindow';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;

  constructor(renderAPI: RenderAPI) {
    if (!App.instance) {
      this.renderAPI = renderAPI;
      App.instance = this;
    }

    return App.instance;
  }

  private gameLoop() {
    const loop = () => {
      console.log('loop');
      requestAnimationFrame(loop);
    };

    loop();
  }

  public start() {
    const gameWindow = new GameWindow(this.renderAPI);

    gameWindow.render();
    this.gameLoop();
  }
}
