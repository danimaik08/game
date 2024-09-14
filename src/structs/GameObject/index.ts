import Point from '~/structs/Point';
import Size from '~/structs/Size';
import Speed from '~/structs/Speed';
import getUniqueId from '~/shared/getUniqueId';

export default class GameObject {
  public point: Point;
  public size: Size;
  public zIndex: number;
  public speed: Speed;
  public text: string;
  public textColor: string;
  public background: string;
  public readonly id: string;

  constructor(
    struct?: Partial<{
      id: string;
      point: Point;
      size: Size;
      speed: Speed;
      zIndex: number;
      background: string;
      text: string;
      textColor: string;
    }>
  ) {
    this.id = struct?.id ?? getUniqueId();
    this.point = struct?.point ?? new Point(0, 0);
    this.size = struct?.size ?? new Size(1, 1);
    this.speed = struct?.speed ?? new Speed(0, 0);
    this.zIndex = struct?.zIndex ?? 1;
    this.text = struct?.text ?? '';
    this.textColor = struct?.textColor ?? '#000';
    this.background = struct?.background ?? 'transparent';
  }

  public move() {
    this.point = new Point(this.point.x + this.speed.x, this.point.y + this.speed.y);
  }

  public clone() {
    return new GameObject(this);
  }
}
