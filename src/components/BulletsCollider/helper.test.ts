import Point from '~/structs/Point';
import Size from '~/structs/Size';

import * as Helper from './helper';

describe('BulletsCollider helper', () => {
  it('hasCollusion equal', () => {
    expect(
      Helper.hasCollusion(
        {
          point: new Point(0, 0),
          size: new Size(40, 40),
        },
        {
          point: new Point(0, 0),
          size: new Size(40, 40),
        }
      )
    ).toBe(true);
  });

  it('hasCollusion 1', () => {
    expect(
      Helper.hasCollusion(
        {
          point: new Point(0, 0),
          size: new Size(40, 40),
        },
        {
          point: new Point(10, 10),
          size: new Size(40, 40),
        }
      )
    ).toBe(true);
  });

  it('hasCollusion 2', () => {
    expect(
      Helper.hasCollusion(
        {
          point: new Point(0, 0),
          size: new Size(40, 40),
        },
        {
          point: new Point(50, 50),
          size: new Size(40, 40),
        }
      )
    ).toBe(false);
  });
});
