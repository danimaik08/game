import MovableObject from '~/MovableObject';
import enemyPng from '~/img/spider.png';
import {
  ENEMY_STATE_INITIAL_POINT,
  ENEMY_STATE_INITIAL_SIZE,
  ENEMY_STATE_INITIAL_SPEED,
} from '~/consts';
import zIndex from '~/zIndex';

export default function createInitialSprite() {
  return new MovableObject(
    ENEMY_STATE_INITIAL_POINT.clone(),
    ENEMY_STATE_INITIAL_SIZE.clone(),
    ENEMY_STATE_INITIAL_SPEED.clone(),
    `url(${enemyPng})`,
    zIndex.enemyState
  );
}
