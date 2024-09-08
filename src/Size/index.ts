export default class Size {
  constructor(public width: number, public height: number) {}

  public clone(): Size {
    return new Size(this.width, this.height);
  }
}
