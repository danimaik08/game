import { GameObjectAPI } from '~/GameObject';

export default class BrowserAPIView {
  private gameObjectAPI: GameObjectAPI;
  private innerElement: HTMLElement;
  public get element(): HTMLElement {
    return this.innerElement;
  }
  public get id(): string {
    return this.gameObjectAPI.id;
  }

  constructor(gameObjectAPI: GameObjectAPI) {
    this.gameObjectAPI = gameObjectAPI;
    this.innerElement = document.createElement('div');
  }

  private get pointAndSizeCss(): string {
    const { point, size } = this.gameObjectAPI;

    return `
    position: absolute;
    top: ${point.y};
    left: ${point.x};
    width: ${size.width};
    height: ${size.height};
    `;
  }

  addStyle(style: string): void {
    this.element.setAttribute('style', this.pointAndSizeCss + style);
  }
}
