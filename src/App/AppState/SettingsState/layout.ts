import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';

import { HINT_POINT, HINT_SIZE } from '../consts';

export const HINT = new GameObject({
  text: 'Нажмите Escape, чтобы выйти назад в меню',
  point: HINT_POINT.clone(),
  size: HINT_SIZE.clone(),
});

export const HEADER = new GameObject({
  text: 'Настройки',
  point: new Point(10, 10),
  size: new Size(100, 30),
});
