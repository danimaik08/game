import Bullet from '~/components/Bullet';
import GameObject from '~/structs/GameObject';
import Speed from '~/structs/Speed';
import Point from '~/structs/Point';
import Size from '~/structs/Size';
import enemyPng from '~/assets/img/spider.png';
import {
  ENEMY_INITIAL_POINT,
  ENEMY_INITIAL_SIZE,
  ENEMY_INITIAL_SPEED,
  ENEMY_LEFT_BORDER,
  ENEMY_RIGHT_BORDER,
  GAME_WINDOW_WIDTH,
} from '~/consts';
import zIndex from '~/zIndex';

export const createBullet = (enemyPoint: Point, enemySize: Size) => {
  const point = new Point(enemyPoint.x + enemySize.width / 2, enemyPoint.y + enemySize.height);

  const speed = new Speed(Math.floor(Math.random() * 10) - 5, 3);

  return new Bullet('enemy', point, speed);
};

export const createInitialGameObject = () => {
  return new GameObject(
    ENEMY_INITIAL_POINT.clone(),
    ENEMY_INITIAL_SIZE.clone(),
    `url(${enemyPng})`,
    zIndex.enemyState,
    ENEMY_INITIAL_SPEED.clone()
  );
};

export const getSpeed = (gameObject: GameObject) => {
  const needPreventLeft = gameObject.point.x <= ENEMY_LEFT_BORDER;

  let speedX = gameObject.speed.x;

  if (needPreventLeft) {
    speedX = Math.abs(speedX);
    return new Speed(speedX, gameObject.speed.y);
  }

  const needPreventRight = gameObject.point.x >= GAME_WINDOW_WIDTH - ENEMY_RIGHT_BORDER - gameObject.size.width;

  if (needPreventRight) {
    speedX = -Math.abs(speedX);
    return new Speed(speedX, gameObject.speed.y);
  }

  return gameObject.speed;
};
