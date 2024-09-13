import Player from '~/components/Player';
import Enemy from '~/components/Enemy';
import Lifebar from '~/components/Lifebar';
import Keyboard from '~/controllers/Keyboard';
import BulletsStore from '~/stores/BulletsStore';
import { KEY_PAUSE, PAUSE_DELAY } from '~/consts';

import AppState from '.';

export default class PlayingState extends AppState {
  private player: Player;
  private enemy: Enemy;
  private bulletsStore: BulletsStore;
  private lifebar: Lifebar;
  private keyboard: Keyboard;

  private isPause: boolean;
  private isReadyToChangeIsPause: boolean;
  private timerOfIsPause: NodeJS.Timeout;

  constructor() {
    super();
    this.player = new Player();
    this.enemy = new Enemy();
    this.bulletsStore = new BulletsStore();
    this.lifebar = new Lifebar();

    this.keyboard = new Keyboard();
    this.isPause = false;
    this.isReadyToChangeIsPause = true;
    this.timerOfIsPause = null;

    this.player.init();
    this.enemy.init();
  }

  public doFrameBehavior() {
    this.processPauseController();

    if (this.isPause) {
      return;
    }

    this.doBulletsFrameBehavior();
    this.player.doFrameBehavior();
    this.enemy.doFrameBehavior();
    this.lifebar.doFrameBehavior();

    super.render();
  }

  private processPauseController() {
    if (this.keyboard.isActiveKey(KEY_PAUSE)) {
      if (this.isReadyToChangeIsPause) {
        this.isPause = !this.isPause;
      }

      this.isReadyToChangeIsPause = false;

      clearTimeout(this.timerOfIsPause);
      this.timerOfIsPause = setTimeout(() => {
        this.isReadyToChangeIsPause = true;
      }, PAUSE_DELAY);
    }
  }
  private doBulletsFrameBehavior() {
    this.bulletsStore.removeBulletsOutsideScreen();
    this.bulletsStore.bullets.forEach((bullet) => {
      bullet.doFrameBehavior();
    });
  }
}
