import Player from '~/components/Player';
import Enemy from '~/components/Enemy';
import Lifebar from '~/components/Lifebar';
import BulletsStore from '~/stores/BulletsStore';

import AppState from '.';

export default class PlayingState extends AppState {
  private player: Player;
  private enemy: Enemy;
  private bulletsStore: BulletsStore;
  private lifebar: Lifebar;

  constructor() {
    super();
    this.player = new Player();
    this.enemy = new Enemy();
    this.bulletsStore = new BulletsStore();
    this.lifebar = new Lifebar();

    this.player.stateName = 'playing';
    this.enemy.stateName = 'playing';
  }

  public doFrameBehavior() {
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
