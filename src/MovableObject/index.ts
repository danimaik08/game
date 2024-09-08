import GameObject from '~/GameObject';
import Point from '~/Point';
import Size from '~/Size';
import Speed from '~/Speed';

import { Direction } from './types';

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

  public moveTo(directions: Direction[]) {
    if (directions.includes('top')) {
      this.innerPoint.y -= this.innerSpeed.y;
    }
    if (directions.includes('bottom')) {
      this.innerPoint.y += this.innerSpeed.y;
    }
    if (directions.includes('left')) {
      this.innerPoint.x -= this.innerSpeed.x;
    }
    if (directions.includes('right')) {
      this.innerPoint.x += this.innerSpeed.x;
    }
  }
}
