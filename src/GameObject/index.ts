import Point from '~/Point';
import Size from '~/Size';
import getUniqueId from '~/shared/getUniqueId';

export interface GameObjectAPI {
  getPoint(): Point;
  getSize(): Size;
  getId(): string;
}

export default abstract class GameObject implements GameObjectAPI {
  protected id: string;
  protected point: Point;
  protected size: Size;

  constructor(point: Point, size: Size) {
    this.id = getUniqueId();
    this.point = point;
    this.size = size;
  }

  public abstract render(): void;

  public getPoint() {
    return this.point.clone();
  }
  public getSize() {
    return this.size.clone();
  }
  public getId() {
    return this.id;
  }
}
