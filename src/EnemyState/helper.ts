import Bullet from '~/Bullet';
import { PointSize } from '~/GameObject/GameObjectAPI';
import Point from '~/Point';
import Speed from '~/Speed';
import MovableObject from '~/MovableObject';
import enemyPng from '~/img/spider.png';
import {
  ENEMY_INITIAL_POINT,
  ENEMY_INITIAL_SIZE,
  ENEMY_INITIAL_SPEED,
  ENEMY_LEFT_BORDER,
  ENEMY_RIGHT_BORDER,
  GAME_WINDOW_WIDTH,
} from '~/consts';
import zIndex from '~/zIndex';
import GameObject from '~/GameObject';

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
    ENEMY_INITIAL_POINT.clone(),
    ENEMY_INITIAL_SIZE.clone(),
    ENEMY_INITIAL_SPEED.clone(),
    `url(${enemyPng})`,
    zIndex.enemyState
  );
};

export const getSpeed = (movableObject: MovableObject) => {
  const needPreventLeft = movableObject.point.x <= ENEMY_LEFT_BORDER;

  let speedX = movableObject.speed.x;

  if (needPreventLeft) {
    speedX = Math.abs(speedX);
    return new Speed(speedX, movableObject.speed.y);
  }

  const needPreventRight =
    movableObject.point.x >=
    GAME_WINDOW_WIDTH - ENEMY_RIGHT_BORDER - movableObject.size.width;

  if (needPreventRight) {
    speedX = -Math.abs(speedX);
    return new Speed(speedX, movableObject.speed.y);
  }

  return movableObject.speed;
};
