import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';

import { HINT_POINT, HINT_SIZE } from '../consts';

export const ESCAPE_HINT = new GameObject({
  text: 'Нажмите Escape, чтобы выйти назад в меню',
  point: HINT_POINT.clone(),
  size: HINT_SIZE.clone(),
});

export const HEADER = new GameObject({
  text: 'Настройки',
  point: new Point(10, 10),
  size: new Size(100, 30),
});

export const HOW_TO_UNLOCK_EDIT_KEY_HINT = new GameObject({
  text: 'Чтобы отредактировать выбранную клавишу, нажмите Enter',
  point: new Point(400, 10),
  size: new Size(390, 60),
});

export const HOW_TO_EDIT_KEY_HINT = new GameObject({
  text: 'Нажмите клавишу, на которую хотите назначить это действие',
  point: new Point(400, 10),
  size: new Size(390, 60),
});
