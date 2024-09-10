import GameObject from '~/components/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';
import Speed from '~/structs/Speed';

export default class MovableObject extends GameObject {
  protected innerSpeed: Speed;

  constructor(
    point: Point,
    size: Size,
    speed: Speed,
    background?: string,
    zIndex?: number
  ) {
    super(point, size, background, zIndex);
    this.innerSpeed = speed;
  }

  public move() {
    this.point = new Point(
      this.point.x + this.speed.x,
      this.point.y + this.speed.y
    );
  }

  get speed() {
    return this.innerSpeed;
  }

  set speed(newSpeed: Speed) {
    this.innerSpeed = newSpeed;
  }
}
