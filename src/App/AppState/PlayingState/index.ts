import Player from '~/components/Player';
import Enemy from '~/components/Enemy';
import Lifebar from '~/components/Lifebar';
import BulletsStore from '~/stores/BulletsStore';
import { KEY_PAUSE, PAUSE_DELAY } from '~/consts';

import AppState from '../.';
import { PAUSE_HINT } from './layout';

export default class PlayingState extends AppState {
  private player: Player;
  private enemy: Enemy;
  private bulletsStore: BulletsStore;
  private lifebar: Lifebar;

  private isPause: boolean;
  private isPauseHintRendered: boolean;
  private isReadyToChangeIsPause: boolean;
  private timerOfIsPause: NodeJS.Timeout;

  constructor() {
    super();
    this.stateName = 'playing';
    this.player = new Player();
    this.enemy = new Enemy();
    this.bulletsStore = new BulletsStore();
    this.lifebar = new Lifebar();

    this.isPause = false;
    this.isPauseHintRendered = false;
    this.isReadyToChangeIsPause = true;
    this.timerOfIsPause = null;

    this.player.init();
    this.enemy.init();
  }

  public doFrameBehavior() {
    this.processPauseController();

    if (this.isPausePreventsRender()) {
      return;
    }

    this.doBulletsFrameBehavior();
    this.player.doFrameBehavior();
    this.enemy.doFrameBehavior();
    this.lifebar.doFrameBehavior();
    this.doPauseHintFrameBehavior();

    super.render();
  }

  private processPauseController() {
    if (this.keyboard.isActiveKey(KEY_PAUSE)) {
      if (this.isReadyToChangeIsPause) {
        this.isPause = !this.isPause;
        this.isPauseHintRendered = false;
      }

      this.isReadyToChangeIsPause = false;

      clearTimeout(this.timerOfIsPause);
      this.timerOfIsPause = setTimeout(() => {
        if (this) {
          this.isReadyToChangeIsPause = true;
        }
      }, PAUSE_DELAY);
    }
  }
  private doBulletsFrameBehavior() {
    this.bulletsStore.removeBulletsOutsideScreen();
    this.bulletsStore.bullets.forEach((bullet) => {
      bullet.doFrameBehavior();
    });
  }
  private doPauseHintFrameBehavior() {
    if (this.isPause) {
      this.addToRenderPauseHint();
      this.isPauseHintRendered = true;
    }
  }
  private addToRenderPauseHint() {
    this.virtualDOM.addElement(PAUSE_HINT);
  }
  private isPausePreventsRender() {
    return this.isPause && this.isPauseHintRendered;
  }
}
