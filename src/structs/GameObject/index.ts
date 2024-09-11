import Point from '~/structs/Point';
import Size from '~/structs/Size';
import Speed from '~/structs/Speed';
import getUniqueId from '~/shared/getUniqueId';

export default class GameObject {
  constructor(
    public point: Point,
    public size: Size,
    public background: string = '',
    public zIndex: number = 1,
    public speed: Speed = new Speed(0, 0),
    public readonly id = getUniqueId()
  ) {}

  public move() {
    this.point = new Point(
      this.point.x + this.speed.x,
      this.point.y + this.speed.y
    );
  }

  public clone() {
    return new GameObject(
      this.point,
      this.size,
      this.background,
      this.zIndex,
      this.speed,
      this.id
    );
  }
}
