import Player from '~/components/Player';
import Enemy from '~/components/Enemy';
import Lifebar from '~/components/Lifebar';
import Keyboard from '~/controllers/Keyboard';
import BulletsStore from '~/stores/BulletsStore';
import { KEY_PAUSE } from '~/consts';

import AppState from '.';

export default class PlayingState extends AppState {
  private player: Player;
  private enemy: Enemy;
  private bulletsStore: BulletsStore;
  private lifebar: Lifebar;
  private keyboard: Keyboard;

  private isPause: boolean;

  constructor() {
    super();
    this.player = new Player();
    this.enemy = new Enemy();
    this.bulletsStore = new BulletsStore();
    this.lifebar = new Lifebar();

    this.keyboard = new Keyboard();
    this.isPause = false;

    this.player.init();
    this.enemy.init();
  }

  public doFrameBehavior() {
    if (this.keyboard.isActiveKey(KEY_PAUSE)) {
      this.isPause = !this.isPause;
    }

    if (this.isPause) {
      return;
    }

    this.doBulletsFrameBehavior();
    this.player.doFrameBehavior();
    this.enemy.doFrameBehavior();
    this.lifebar.doFrameBehavior();

    super.render();
  }

  private doBulletsFrameBehavior() {
    this.bulletsStore.removeBulletsOutsideScreen();
    this.bulletsStore.bullets.forEach((bullet) => {
      bullet.doFrameBehavior();
    });
  }
}
