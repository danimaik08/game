export default class Size {
  constructor(public readonly width: number, public readonly height: number) {}

  public clone(): Size {
    return new Size(this.width, this.height);
  }

  public valueOf() {
    return this.width + ' ' + this.height;
  }
}
