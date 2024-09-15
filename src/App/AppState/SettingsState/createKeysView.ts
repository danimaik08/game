import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';

import KeysView from './KeysView';
import { KeysViewType } from './types';

const createKeysView = (type: KeysViewType): KeysView => {
  switch (type) {
    case 'TOP': {
      return new KeysView(
        type,
        new GameObject({
          text: 'Вперёд',
          point: new Point(20, 50),
          size: new Size(50, 30),
        }),
        new GameObject({
          point: new Point(120, 50),
          size: new Size(50, 30),
        })
      );
    }
    case 'LEFT': {
      return new KeysView(
        type,
        new GameObject({
          text: 'Влево',
          point: new Point(20, 80),
          size: new Size(50, 30),
        }),
        new GameObject({
          point: new Point(120, 80),
          size: new Size(50, 30),
        })
      );
    }
    case 'BOTTOM': {
      return new KeysView(
        type,
        new GameObject({
          text: 'Назад',
          point: new Point(20, 110),
          size: new Size(50, 30),
        }),
        new GameObject({
          point: new Point(120, 110),
          size: new Size(50, 30),
        })
      );
    }
    case 'RIGHT': {
      return new KeysView(
        type,
        new GameObject({
          text: 'Вправо',
          point: new Point(20, 140),
          size: new Size(50, 30),
        }),
        new GameObject({
          point: new Point(120, 140),
          size: new Size(50, 30),
        })
      );
    }
    case 'ATTACK': {
      return new KeysView(
        type,
        new GameObject({
          text: 'Атака',
          point: new Point(20, 220),
          size: new Size(50, 30),
        }),
        new GameObject({
          point: new Point(120, 220),
          size: new Size(50, 30),
        })
      );
    }
    case 'PAUSE': {
      return new KeysView(
        type,
        new GameObject({
          text: 'Пауза',
          point: new Point(20, 180),
          size: new Size(50, 30),
        }),
        new GameObject({
          point: new Point(120, 180),
          size: new Size(50, 30),
        })
      );
    }
  }
};

export default createKeysView;
