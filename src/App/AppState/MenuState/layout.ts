import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';

import { HINT_POINT, HINT_SIZE } from '../consts';

export const HINT = new GameObject({
  text: 'Нажмите Enter, чтобы продолжить',
  point: HINT_POINT.clone(),
  size: HINT_SIZE.clone(),
});

export const HEADER = new GameObject({
  text: 'Главное меню',
  point: new Point(330, 260),
  size: new Size(150, 30),
});

export const NEW_GAME_BUTTON = new GameObject({
  text: 'Новая игра',
  point: new Point(340, 300),
  size: new Size(100, 30),
});

export const SETTINGS_BUTTON = new GameObject({
  text: 'Настройки',
  point: new Point(340, 330),
  size: new Size(100, 30),
});
