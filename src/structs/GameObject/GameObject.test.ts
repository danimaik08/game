import GameObject from './index';

describe('GameObject tests', () => {
  it('is not unique id 1', () => {
    const obj1 = new GameObject();
    const obj2 = new GameObject();

    expect(obj1.id === obj2.id).toBe(false);
  });
  it('is not unique id 2', () => {
    const obj1 = new GameObject();
    const obj2 = new GameObject();

    expect(obj1.id === obj2.id).toBe(false);
  });
  it('is not unique id 3', () => {
    const obj1 = new GameObject();
    const obj2 = new GameObject();

    expect(obj1.id === obj2.id).toBe(false);
  });
  it('unique id', () => {
    const obj1 = new GameObject();
    const obj2 = obj1.clone();

    expect(obj1.id === obj2.id).toBe(true);
  });
});
