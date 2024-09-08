export default class Speed {
  constructor(public x: number, public y: number) {}

  public clone(): Speed {
    return new Speed(this.x, this.y);
  }
}
