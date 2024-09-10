import Point from '~/components/Point';
import Size from '~/components/Size';
import getUniqueId from '~/shared/getUniqueId';
import GameObjectAPI from './GameObjectAPI';

export default class GameObject implements GameObjectAPI {
  protected innerId: string;
  protected innerPoint: Point;
  protected innerSize: Size;
  protected innerBackground: string;
  protected innerZIndex: number;

  constructor(
    point: Point,
    size: Size,
    background: string = '',
    zIndex: number = 1
  ) {
    this.innerId = getUniqueId();
    this.innerPoint = point;
    this.innerSize = size;
    this.innerBackground = background;
    this.innerZIndex = zIndex;
  }

  public get id() {
    return this.innerId;
  }
  public get point() {
    return this.innerPoint;
  }
  public set point(value: Point) {
    this.innerPoint = value;
  }
  public get size() {
    return this.innerSize;
  }
  public get background() {
    return this.innerBackground;
  }
  public get zIndex() {
    return this.innerZIndex;
  }
}
