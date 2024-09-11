export default class Speed {
  constructor(public readonly x: number, public readonly y: number) {}

  public clone(): Speed {
    return new Speed(this.x, this.y);
  }

  public valueOf() {
    return this.x + ' ' + this.y;
  }
}
