import RenderAPI from '~/RenderAPI';
import GameWindow from '~/GameWindow';
import GameLoop from '~/GameLoop';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import VirtualDOM from '~/VirtualDOM';
import KeyboardController from '~/KeyboardController';
import GameObject from '~/GameObject';
import Point from '~/Point';
import Size from '~/Size';

class Speed {
  constructor(public x: number, public y: number) {}
}

type Direction = 'top' | 'left' | 'right' | 'bottom';

class MovingObject extends GameObject {
  protected innerSpeed: Speed;

  constructor(
    point: Point,
    size: Size,
    speed: Speed,
    background?: string,
    zIndex?: number
  ) {
    super(point, size, background, zIndex);
    this.innerSpeed = speed;
  }

  public moveTo(directions: Direction[]) {
    if (directions.includes('top')) {
      this.innerPoint.y -= this.innerSpeed.y;
    }
    if (directions.includes('bottom')) {
      this.innerPoint.y += this.innerSpeed.y;
    }
    if (directions.includes('left')) {
      this.innerPoint.x -= this.innerSpeed.x;
    }
    if (directions.includes('right')) {
      this.innerPoint.x += this.innerSpeed.x;
    }
  }
}

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;
  private virtualDOM: VirtualDOM;
  private keyboardController: KeyboardController;

  constructor() {
    if (!App.instance) {
      this.renderAPI = getRenderAPI();
      this.gameLoop = new GameLoop();
      this.virtualDOM = new VirtualDOM();
      this.keyboardController = new KeyboardController();
      App.instance = this;
    }

    return App.instance;
  }

  private render() {
    this.renderAPI.render(this.virtualDOM.getChanges());
    this.virtualDOM.prepareForNewFrame();
  }

  public start() {
    const gameWindow = new GameWindow(this.renderAPI);

    gameWindow.render();

    this.keyboardController.addEventListeners();

    const controlledObject = new MovingObject(
      new Point(50, 50),
      new Size(50, 50),
      new Speed(1, 1),
      'red'
    );

    this.gameLoop.start(() => {
      this.virtualDOM.addElement(controlledObject);
      const directions: Direction[] = [];

      if (this.keyboardController.isActiveKey('W')) {
        directions.push('top');
      }
      if (this.keyboardController.isActiveKey('A')) {
        directions.push('left');
      }
      if (this.keyboardController.isActiveKey('S')) {
        directions.push('bottom');
      }
      if (this.keyboardController.isActiveKey('D')) {
        directions.push('right');
      }

      controlledObject.moveTo(directions);

      this.render();
    });
  }
}
