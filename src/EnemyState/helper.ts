import Bullet from '~/Bullet';
import { PointSize } from '~/GameObject/GameObjectAPI';
import Point from '~/Point';
import Speed from '~/Speed';
import MovableObject from '~/MovableObject';
import enemyPng from '~/img/spider.png';
import {
  ENEMY_STATE_INITIAL_POINT,
  ENEMY_STATE_INITIAL_SIZE,
  ENEMY_STATE_INITIAL_SPEED,
} from '~/consts';
import zIndex from '~/zIndex';

export const createBullet = (obj: PointSize) => {
  const point = new Point(
    obj.point.x + obj.size.width / 2,
    obj.point.y + obj.size.height
  );

  const speed = new Speed(Math.floor(Math.random() * 10) - 5, 3);

  return new Bullet('enemy', point, speed);
};

export const createInitialSprite = () => {
  return new MovableObject(
    ENEMY_STATE_INITIAL_POINT.clone(),
    ENEMY_STATE_INITIAL_SIZE.clone(),
    ENEMY_STATE_INITIAL_SPEED.clone(),
    `url(${enemyPng})`,
    zIndex.enemyState
  );
};
