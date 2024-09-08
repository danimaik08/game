export default class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  public clone(): Point {
    return new Point(this.x, this.y);
  }
}
