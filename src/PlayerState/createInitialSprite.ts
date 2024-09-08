import MovableObject from '~/MovableObject';
import playerPng from '~/img/wizard.png';
import {
  PLAYER_STATE_INITIAL_POINT,
  PLAYER_STATE_INITIAL_SIZE,
  PLAYER_STATE_INITIAL_SPEED,
} from '~/consts';
import zIndex from '~/zIndex';

export default function createInitialSprite() {
  return new MovableObject(
    PLAYER_STATE_INITIAL_POINT.clone(),
    PLAYER_STATE_INITIAL_SIZE.clone(),
    PLAYER_STATE_INITIAL_SPEED.clone(),
    `url(${playerPng})`,
    zIndex.playerState
  );
}
