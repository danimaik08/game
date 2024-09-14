import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';
import Speed from '~/structs/Speed';

import VirtualDOM from '.';

describe('VirtualDOM', () => {
  afterEach(() => {
    new VirtualDOM().destroy();
  });

  it('clear', () => {
    const virtualDOM = new VirtualDOM();

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(0);
  });
  it('add 1 element', () => {
    const virtualDOM = new VirtualDOM();

    virtualDOM.addElement(new GameObject());

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(1);
  });
  it('add 1 element (twice)', () => {
    const virtualDOM = new VirtualDOM();

    const testGameObject = new GameObject();

    virtualDOM.addElement(testGameObject.clone());
    virtualDOM.addElement(testGameObject.clone());

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(1);
  });
  it('add 3 elements', () => {
    const virtualDOM = new VirtualDOM();

    virtualDOM.addElement(new GameObject());
    virtualDOM.addElement(new GameObject());
    virtualDOM.addElement(new GameObject());

    const changes = virtualDOM.getChanges();

    expect(changes.length).toBe(3);
  });
  it('mount', () => {
    const virtualDOM = new VirtualDOM();

    virtualDOM.addElement(new GameObject());

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'mount').length).toBe(1);
  });
  it('zero mount', () => {
    const virtualDOM = new VirtualDOM();

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'mount').length).toBe(0);
  });
  it('4 unmount, 1 mount', () => {
    const virtualDOM = new VirtualDOM();

    virtualDOM.addElement(new GameObject());
    virtualDOM.addElement(new GameObject());
    virtualDOM.addElement(new GameObject());
    virtualDOM.addElement(new GameObject());

    virtualDOM.prepareForNewFrame();

    virtualDOM.addElement(new GameObject());

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'unmount').length).toBe(4);
    expect(changes.filter((change) => change.action === 'mount').length).toBe(1);
  });
  it('getChanges before adding', () => {
    const virtualDOM = new VirtualDOM();

    const changes = virtualDOM.getChanges();
    virtualDOM.addElement(new GameObject());

    expect(changes.length).toBe(0);
  });
  it('update', () => {
    const virtualDOM = new VirtualDOM();

    const gameObject = new GameObject({ speed: new Speed(1, 1) });

    virtualDOM.addElement(gameObject);

    const changes1 = virtualDOM.getChanges();

    expect(changes1.filter((change) => change.action === 'mount').length).toBe(1);

    virtualDOM.prepareForNewFrame();

    const changes2 = virtualDOM.getChanges();

    expect(changes2.filter((change) => change.action === 'unmount').length).toBe(1);

    gameObject.move();

    virtualDOM.addElement(gameObject);

    const changes3 = virtualDOM.getChanges();

    expect(changes3.filter((change) => change.action === 'update').length).toBe(1);
  });
  it('try to update with zero speed', () => {
    const virtualDOM = new VirtualDOM();

    const gameObject = new GameObject();

    virtualDOM.addElement(gameObject);
    virtualDOM.prepareForNewFrame();

    gameObject.move();

    virtualDOM.addElement(gameObject);

    const changes = virtualDOM.getChanges();

    expect(changes.filter((change) => change.action === 'update').length).toBe(0);
  });
});
