import VirtualDOM from '~/VirtualDOM';
import MovableObject from '~/components/MovableObject';
import { BULLET_SIZE } from '~/consts';
import zIndex from '~/zIndex';
import enemyBulletPng from '~/assets/img/web.png';
import playerBulletPng from '~/assets/img/fireball.png';
import Point from '~/structs/Point';
import Speed from '~/structs/Speed';

import { BulletType } from './types';

export default class Bullet {
  private sprite: MovableObject | null;
  private virtualDOM: VirtualDOM;

  private static createInitialSprite(
    type: BulletType,
    point: Point,
    speed: Speed
  ) {
    return new MovableObject(
      point.clone(),
      BULLET_SIZE.clone(),
      speed.clone(),
      `url(${type === 'enemy' ? enemyBulletPng : playerBulletPng})`,
      zIndex.bulletState
    );
  }

  constructor(private innerType: BulletType, point: Point, speed: Speed) {
    this.virtualDOM = new VirtualDOM();
    this.sprite = Bullet.createInitialSprite(this.innerType, point, speed);
  }

  get point() {
    return this.sprite.point;
  }
  get size() {
    return this.sprite.size;
  }
  get id() {
    return this.sprite.id;
  }
  get type() {
    return this.innerType;
  }

  private processMovement() {
    this.sprite.move();
  }
  private addToNextRender() {
    this.virtualDOM.addElement(this.sprite);
  }

  public doFrameBehavior() {
    this.processMovement();
    this.addToNextRender();
  }
}
