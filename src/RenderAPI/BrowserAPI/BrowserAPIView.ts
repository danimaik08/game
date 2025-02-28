import { GameObjectStruct } from '~/structs/GameObject/types';

export default class BrowserAPIView {
  private gameObject: GameObjectStruct;
  private innerElement: HTMLElement;
  public get element(): HTMLElement {
    return this.innerElement;
  }
  public get id(): string {
    return this.gameObject.id;
  }

  constructor(gameObject: GameObjectStruct) {
    this.gameObject = gameObject;
    this.innerElement = null;
  }

  public createElement() {
    this.innerElement = document.createElement('div');
  }

  public setElement(html: HTMLElement) {
    this.innerElement = html;
  }

  public applyActualChange(): void {
    this.element.setAttribute('style', this.css);
    this.element.innerHTML = this.gameObject.text;
  }

  private get css(): string {
    const { point, size, background, textColor, zIndex } = this.gameObject;

    return `
    position: absolute;
    top: ${point.y}px;
    left: ${point.x}px;
    z-index: ${zIndex};
    width: ${size.width}px;
    height: ${size.height}px;
    background: ${background};
    color: ${textColor};
    `;
  }
}
