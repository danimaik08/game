import GameObjectAPI from '~/GameObject/GameObjectAPI';

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

  private get css(): string {
    const { point, size, background, zIndex } = this.gameObjectAPI;

    return `
    position: absolute;
    top: ${point.y}px;
    left: ${point.x}px;
    z-index: ${zIndex};
    width: ${size.width}px;
    height: ${size.height}px;
    background: ${background};
    `;
  }

  public applyActualChange(): void {
    this.element.setAttribute('style', this.css);
  }
}
