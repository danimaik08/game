import VirtualDOM from '~/VirtualDOM';
import GameObject from '~/structs/GameObject';
import { BULLET_SIZE } from '~/consts';
import zIndex from '~/zIndex';
import enemyBulletPng from '~/assets/img/web.png';
import playerBulletPng from '~/assets/img/fireball.png';
import Point from '~/structs/Point';
import Speed from '~/structs/Speed';

import { BulletType } from './types';

export default class Bullet {
  private gameObject: GameObject;
  private virtualDOM: VirtualDOM;

  get point() {
    return this.gameObject.point;
  }
  get size() {
    return this.gameObject.size;
  }
  get id() {
    return this.gameObject.id;
  }

  constructor(public readonly type: BulletType, point: Point, speed: Speed) {
    this.virtualDOM = new VirtualDOM();
    this.gameObject = Bullet.createInitialSprite(this.type, point, speed);
  }

  public doFrameBehavior() {
    this.processMovement();
    this.addToNextRender();
  }

  private static createInitialSprite(type: BulletType, point: Point, speed: Speed) {
    return new GameObject({
      point: point.clone(),
      size: BULLET_SIZE.clone(),
      speed: speed.clone(),
      zIndex: zIndex.playingState.bullet,
      background: `url(${type === 'enemy' ? enemyBulletPng : playerBulletPng})`,
    });
  }

  private processMovement() {
    this.gameObject.move();
  }
  private addToNextRender() {
    this.virtualDOM.addElement(this.gameObject);
  }
}
