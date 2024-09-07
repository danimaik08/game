import RenderAPI from '~/RenderAPI';
import GameWindow from '~/GameWindow';
import GameLoop from '~/GameLoop';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import VirtualDOM from '~/VirtualDOM';
import GameObject from '~/GameObject';
import Point from '~/Point';
import Size from '~/Size';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;
  private virtualDOM: VirtualDOM;

  constructor() {
    if (!App.instance) {
      this.renderAPI = getRenderAPI();
      this.gameLoop = new GameLoop();
      this.virtualDOM = new VirtualDOM();
      App.instance = this;
    }

    return App.instance;
  }

  public start() {
    const gameWindow = new GameWindow(this.renderAPI);

    gameWindow.render();

    const redSquare = new GameObject(
      new Point(30, 30),
      new Size(100, 100),
      'red'
    );

    const blueSquare = new GameObject(
      new Point(40, 40),
      new Size(100, 100),
      'blue',
      2
    );

    this.virtualDOM.addElement(redSquare);
    this.virtualDOM.addElement(blueSquare);

    this.renderAPI.render(this.virtualDOM.getChanges());

    this.gameLoop.start(() => {});
  }
}
