import Point from '~/Point';
import Size from '~/Size';
import getUniqueId from '~/shared/getUniqueId';

export interface GameObjectAPI {
  id: string;
  point: Point;
  size: Size;
}

export default abstract class GameObject implements GameObjectAPI {
  protected innerId: string;
  protected innerPoint: Point;
  protected innerSize: Size;

  constructor(point: Point, size: Size) {
    this.innerId = getUniqueId();
    this.innerPoint = point;
    this.innerSize = size;
  }

  public abstract render(): void;

  public get id() {
    return this.innerId;
  }
  public get point() {
    return this.innerPoint.clone();
  }
  public get size() {
    return this.innerSize.clone();
  }
}
