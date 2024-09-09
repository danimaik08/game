import GameObject from '~/GameObject';
import Point from '~/Point';
import Size from '~/Size';
import VirtualDOM from '~/VirtualDOM';
import {
  GAME_WINDOW_WIDTH,
  PLAYER_MAX_HEALTH,
  ENEMY_STATE_MAX_HEALTH,
  PLAYER_HEALTH_ICON_SIZE,
} from '~/consts';
import zIndex from '~/zIndex';
import lifeIcon from '~/img/life.png';
import noLifeIcon from '~/img/nolife.png';

export default class Lifebar {
  private static instance: Lifebar;
  private innerPlayerHealth: number;
  private innerEnemyHealth: number;
  private virtualDOM: VirtualDOM;

  constructor() {
    if (!Lifebar.instance) {
      this.innerPlayerHealth = PLAYER_MAX_HEALTH;
      this.innerEnemyHealth = ENEMY_STATE_MAX_HEALTH;
      this.virtualDOM = new VirtualDOM();
      Lifebar.instance = this;
    }

    return Lifebar.instance;
  }

  private addToRenderEmptyBar() {
    this.virtualDOM.addElement(
      new GameObject(
        new Point(0, 0),
        new Size(800, 29),
        '#009',
        zIndex.lifebar.emptyLifebar
      )
    );
  }

  private addToRenderEnemyEmptyHealth() {
    this.virtualDOM.addElement(
      new GameObject(
        new Point(0, 0),
        new Size(ENEMY_STATE_MAX_HEALTH, 29),
        '#000',
        zIndex.lifebar.enemyEmptyHealth
      )
    );
  }

  private addToRenderEnemyHealth() {
    this.virtualDOM.addElement(
      new GameObject(
        new Point(0, 0),
        new Size(this.enemyHealth, 29),
        '#f00',
        zIndex.lifebar.enemyHealth
      )
    );
  }

  private addToRenderPlayerHealth() {
    const OFFSET = { x: 1, y: 1 };

    for (let i = 1; i <= PLAYER_MAX_HEALTH; i++) {
      const isLife = this.playerHealth >= i;
      const point = new Point(
        GAME_WINDOW_WIDTH - (OFFSET.x + PLAYER_HEALTH_ICON_SIZE.width) * i,
        OFFSET.y
      );

      this.virtualDOM.addElement(
        new GameObject(
          point,
          PLAYER_HEALTH_ICON_SIZE,
          `url(${isLife ? lifeIcon : noLifeIcon})`,
          zIndex.lifebar.playerHealth
        )
      );
    }
  }

  get playerHealth() {
    return this.innerPlayerHealth;
  }
  get enemyHealth() {
    return this.innerEnemyHealth;
  }
  set playerHealth(value) {
    if (value >= 0) {
      this.innerPlayerHealth = value;
    } else {
      this.innerPlayerHealth = 0;
    }
  }
  set enemyHealth(value) {
    if (value >= 0) {
      this.innerEnemyHealth = value;
    } else {
      this.innerEnemyHealth = 0;
    }
  }

  public doFrameBehavior() {
    this.addToRenderEmptyBar();
    this.addToRenderEnemyEmptyHealth();
    this.addToRenderEnemyHealth();
    this.addToRenderPlayerHealth();
  }
}
