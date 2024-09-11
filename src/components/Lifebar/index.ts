import GameObject from '~/structs/GameObject';
import Enemy from '~/components/Enemy';
import Player from '~/components/Player';
import Point from '~/structs/Point';
import Size from '~/structs/Size';
import VirtualDOM from '~/VirtualDOM';
import {
  GAME_WINDOW_WIDTH,
  PLAYER_MAX_HEALTH,
  ENEMY_MAX_HEALTH,
  PLAYER_HEALTH_ICON_SIZE,
  LIFEBAR_HEIGHT,
  LIFEBAR_COLOR,
  LIFEBAR_ENEMY_EMPTY_HEALTH_COLOR,
  LIFEBAR_ENEMY_FULL_HEALTH_COLOR,
} from '~/consts';
import zIndex from '~/zIndex';
import lifeIcon from '~/assets/img/life.png';
import noLifeIcon from '~/assets/img/nolife.png';

export default class Lifebar {
  private static instance: Lifebar;
  private readonly emptyBar: GameObject;
  private readonly enemyEmptyHealth: GameObject;
  private readonly enemyHealth: GameObject;
  private healths: GameObject[];
  private enemy: Enemy;
  private player: Player;
  private virtualDOM: VirtualDOM;

  constructor() {
    if (!Lifebar.instance) {
      this.enemy = new Enemy();
      this.player = new Player();
      this.virtualDOM = new VirtualDOM();
      this.emptyBar = new GameObject(
        new Point(0, 0),
        new Size(GAME_WINDOW_WIDTH, LIFEBAR_HEIGHT),
        LIFEBAR_COLOR,
        zIndex.lifebar.emptyLifebar
      );
      this.enemyEmptyHealth = new GameObject(
        new Point(0, 0),
        new Size(ENEMY_MAX_HEALTH, LIFEBAR_HEIGHT),
        LIFEBAR_ENEMY_EMPTY_HEALTH_COLOR,
        zIndex.lifebar.enemyEmptyHealth
      );
      this.enemyHealth = new GameObject(
        new Point(0, 0),
        new Size(this.enemy.health, LIFEBAR_HEIGHT),
        LIFEBAR_ENEMY_FULL_HEALTH_COLOR,
        zIndex.lifebar.enemyHealth
      );

      const OFFSET = { x: 1, y: 1 };
      this.healths = [];

      for (let i = 1; i <= PLAYER_MAX_HEALTH; i++) {
        const isLife = this.player.health >= i;
        const point = new Point(
          GAME_WINDOW_WIDTH - (OFFSET.x + PLAYER_HEALTH_ICON_SIZE.width) * i,
          OFFSET.y
        );

        this.healths.push(
          new GameObject(
            point,
            PLAYER_HEALTH_ICON_SIZE,
            `url(${isLife ? lifeIcon : noLifeIcon})`,
            zIndex.lifebar.playerHealth
          )
        );
      }

      Lifebar.instance = this;
    }

    return Lifebar.instance;
  }

  public doFrameBehavior() {
    this.addToRenderEmptyBar();
    this.addToRenderEnemyEmptyHealth();
    this.addToRenderEnemyHealth();
    this.addToRenderPlayerHealth();
  }

  private addToRenderEmptyBar() {
    this.virtualDOM.addElement(this.emptyBar);
  }

  private addToRenderEnemyEmptyHealth() {
    this.virtualDOM.addElement(this.enemyEmptyHealth);
  }

  private addToRenderEnemyHealth() {
    this.virtualDOM.addElement(this.enemyHealth);
  }

  private addToRenderPlayerHealth() {
    for (let i = 1; i <= PLAYER_MAX_HEALTH; i++) {
      const isLife = this.player.health >= i;

      this.healths[i - 1].background = `url(${isLife ? lifeIcon : noLifeIcon})`;
      this.virtualDOM.addElement(this.healths[i - 1]);
    }
  }
}
