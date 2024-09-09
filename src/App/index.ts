import RenderAPI from '~/RenderAPI';
import GameWindow from '~/GameWindow';
import GameLoop from '~/GameLoop';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import VirtualDOM from '~/VirtualDOM';
import PlayerState from '~/PlayerState';
import EnemyState from '~/EnemyState';
import BulletsStore from '~/BulletsStore';
import Lifebar from '~/Lifebar';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;
  private virtualDOM: VirtualDOM;
  private playerState: PlayerState;
  private enemyState: EnemyState;
  private bulletsStore: BulletsStore;
  private lifebar: Lifebar;

  constructor() {
    if (!App.instance) {
      this.renderAPI = getRenderAPI();
      this.gameLoop = new GameLoop();
      this.virtualDOM = new VirtualDOM();
      this.playerState = new PlayerState();
      this.enemyState = new EnemyState();
      this.bulletsStore = new BulletsStore();
      this.lifebar = new Lifebar();
      App.instance = this;
    }

    return App.instance;
  }

  private render() {
    this.renderAPI.render(this.virtualDOM.getChanges());
    this.virtualDOM.prepareForNewFrame();
  }

  private doBulletsFrameBehavior() {
    this.bulletsStore.removeBulletsOutsideScreen();
    this.bulletsStore.bullets.forEach((bullet) => {
      bullet.doFrameBehavior();
    });
  }

  public start() {
    const gameWindow = new GameWindow(this.renderAPI);

    gameWindow.render();

    this.playerState.state = 'playing';
    this.enemyState.state = 'playing';

    this.gameLoop.start(() => {
      this.doBulletsFrameBehavior();
      this.playerState.doFrameBehavior();
      this.enemyState.doFrameBehavior();
      this.lifebar.doFrameBehavior();

      this.render();
    });
  }
}
