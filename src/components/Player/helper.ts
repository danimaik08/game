import GameObject from '~/structs/GameObject';
import Keyboard from '~/controllers/Keyboard';
import Speed from '~/structs/Speed';
import playerPng from '~/assets/img/wizard.png';
import {
  PLAYER_INITIAL_POINT,
  PLAYER_INITIAL_SIZE,
  PLAYER_INITIAL_SPEED,
  PLAYER_MIN_TOP,
  GAME_WINDOW_HEIGHT,
  GAME_WINDOW_WIDTH,
  PLAYER_MOVEMENT_SPEED,
  KEY_TOP,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_BOTTOM,
} from '~/consts';
import zIndex from '~/zIndex';

export const createInitialGameObject = () => {
  return new GameObject({
    point: PLAYER_INITIAL_POINT.clone(),
    size: PLAYER_INITIAL_SIZE.clone(),
    speed: PLAYER_INITIAL_SPEED.clone(),
    background: `url(${playerPng})`,
    zIndex: zIndex.playerState,
  });
};

export const getSpeedByKeyboardsKeys = (obj: GameObject, keyboard: Keyboard) => {
  const needPreventTop = obj.point.y <= PLAYER_MIN_TOP;
  const needPreventLeft = obj.point.x <= 0;
  const needPreventBottom = obj.point.y >= GAME_WINDOW_HEIGHT - obj.size.height;
  const needPreventRight = obj.point.x >= GAME_WINDOW_WIDTH - obj.size.width;

  let speedX = 0;
  let speedY = 0;

  if (keyboard.isActiveKey(KEY_TOP) && !needPreventTop) {
    speedY = -PLAYER_MOVEMENT_SPEED;
  }
  if (keyboard.isActiveKey(KEY_LEFT) && !needPreventLeft) {
    speedX = -PLAYER_MOVEMENT_SPEED;
  }
  if (keyboard.isActiveKey(KEY_BOTTOM) && !needPreventBottom) {
    speedY = PLAYER_MOVEMENT_SPEED;
  }
  if (keyboard.isActiveKey(KEY_RIGHT) && !needPreventRight) {
    speedX = PLAYER_MOVEMENT_SPEED;
  }

  return new Speed(speedX, speedY);
};
