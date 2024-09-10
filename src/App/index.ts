import RenderAPI from '~/RenderAPI';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import Player from '~/components/Player';
import Enemy from '~/components/Enemy';
import Lifebar from '~/components/Lifebar';
import BulletsStore from '~/stores/BulletsStore';
import VirtualDOM from '~/VirtualDOM';
import GameLoop from '~/GameLoop';
import GameWindow from '~/GameWindow';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;
  private virtualDOM: VirtualDOM;
  private player: Player;
  private enemy: Enemy;
  private bulletsStore: BulletsStore;
  private lifebar: Lifebar;

  constructor() {
    if (!App.instance) {
      this.renderAPI = getRenderAPI();
      this.gameLoop = new GameLoop();
      this.virtualDOM = new VirtualDOM();
      this.player = new Player();
      this.enemy = new Enemy();
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

    this.player.stateName = 'playing';
    this.enemy.stateName = 'playing';

    this.gameLoop.start(() => {
      this.doBulletsFrameBehavior();
      this.player.doFrameBehavior();
      this.enemy.doFrameBehavior();
      this.lifebar.doFrameBehavior();

      this.render();
    });
  }
}
