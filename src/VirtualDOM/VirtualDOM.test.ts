import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';

import VirtualDOM from '.';
import Speed from '~/structs/Speed';

describe('VirtualDOM', () => {
  const virtualDOM = new VirtualDOM();

  it('clear', () => {
    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(0);
  });
  it('add 1 element', () => {
    const gameObject = new GameObject(new Point(0, 0), new Size(1, 1));

    virtualDOM.addElement(gameObject);

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(1);
  });
  it('add 3 elements', () => {
    const gameObject1 = new GameObject(new Point(0, 0), new Size(1, 1));
    const gameObject2 = new GameObject(new Point(0, 0), new Size(1, 1));
    const gameObject3 = new GameObject(new Point(0, 0), new Size(1, 1));

    virtualDOM.addElement(gameObject1);
    virtualDOM.addElement(gameObject2);
    virtualDOM.addElement(gameObject3);

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(4);
  });
  it('mount', () => {
    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'mount').length).toBe(
      4
    );
  });
  it('prepareForNewFrame', () => {
    virtualDOM.prepareForNewFrame();

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(4);
  });
  it('zero mount', () => {
    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'mount').length).toBe(
      0
    );
  });
  it('4 unmount, 1 mount', () => {
    virtualDOM.addElement(new GameObject(new Point(0, 0), new Size(1, 1)));

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'unmount').length).toBe(
      4
    );
    expect(changes.filter((change) => change.action === 'mount').length).toBe(
      1
    );
  });
  it('1 mount and zero unmounts', () => {
    virtualDOM.prepareForNewFrame();

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(1);
  });
  it('update', () => {
    const gameObject = new GameObject(
      new Point(0, 0),
      new Size(1, 1),
      '',
      1,
      new Speed(1, 1)
    );

    virtualDOM.addElement(gameObject);
    virtualDOM.prepareForNewFrame();

    gameObject.move();

    virtualDOM.addElement(gameObject);

    const changes1 = virtualDOM.getChanges();

    expect(changes1.filter((change) => change.action === 'update').length).toBe(
      1
    );

    virtualDOM.prepareForNewFrame();

    const changes2 = virtualDOM.getChanges();

    expect(changes2.filter((change) => change.action === 'update').length).toBe(
      0
    );
  });
});
