import GameObject from '~/components/GameObject';
import Point from '~/components/Point';
import Size from '~/components/Size';

import VirtualDOM from '.';

describe('VirtualDOM', () => {
  it('clear', () => {
    const virtualDOM = new VirtualDOM();

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(0);
  });
  it('add 1 element', () => {
    const virtualDOM = new VirtualDOM();

    const gameObject = new GameObject(new Point(0, 0), new Size(1, 1));

    virtualDOM.addElement(gameObject);

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(1);
  });
  it('add 3 elements', () => {
    const virtualDOM = new VirtualDOM();

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
    const virtualDOM = new VirtualDOM();

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'mount').length).toBe(
      4
    );
  });
  it('prepareForNewFrame', () => {
    const virtualDOM = new VirtualDOM();

    virtualDOM.prepareForNewFrame();

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(4);
  });
  it('zero mount', () => {
    const virtualDOM = new VirtualDOM();

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'mount').length).toBe(
      0
    );
  });
  it('4 unmount, 1 mount', () => {
    const virtualDOM = new VirtualDOM();

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
    const virtualDOM = new VirtualDOM();

    virtualDOM.prepareForNewFrame();

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(1);
  });
});
