import GameObject from '~/structs/GameObject';

import { HINT_POINT, HINT_SIZE } from '../consts';

export const HINT = new GameObject({
  text: 'Нажмите Escape, чтобы выйти назад в меню',
  point: HINT_POINT.clone(),
  size: HINT_SIZE.clone(),
});
