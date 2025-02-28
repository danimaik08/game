import GameObject from '~/structs/GameObject';
import zIndex from '~/zIndex';

import { HINT_POINT, HINT_SIZE } from '../consts';

export const PAUSE_HINT = new GameObject({
  point: HINT_POINT.clone(),
  size: HINT_SIZE.clone(),
  zIndex: zIndex.playingState.pauseHint,
});
