import Point from '~/structs/Point';
import Size from '~/structs/Size';

import GameObject from './index';

class TestGameObject extends GameObject {
  render() {}
}

describe('GameObject tests', () => {
  it('unique id 1', () => {
    const obj1 = new TestGameObject(new Point(0, 0), new Size(0, 0));
    const obj2 = new TestGameObject(new Point(0, 0), new Size(0, 0));

    expect(obj1.id === obj2.id).toBe(false);
  });
  it('unique id 2', () => {
    const obj1 = new TestGameObject(new Point(0, 0), new Size(0, 0));
    const obj2 = new TestGameObject(new Point(0, 0), new Size(0, 0));

    expect(obj1.id === obj2.id).toBe(false);
  });
  it('unique id 3', () => {
    const obj1 = new TestGameObject(new Point(0, 0), new Size(0, 0));
    const obj2 = new TestGameObject(new Point(0, 0), new Size(0, 0));

    expect(obj1.id === obj2.id).toBe(false);
  });
});
