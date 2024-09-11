import * as consts from '~/RenderAPI/consts';
import RenderAPI from '~/RenderAPI';
import { GameObjectStruct } from '~/structs/GameObject/types';
import { VirtualDOMChange } from '~/VirtualDOM/types';

import * as Helper from './helper';
import BrowserAPIView from './BrowserAPIView';

export default class BrowserAPI extends RenderAPI {
  private elementsMap: Record<GameObjectStruct['id'], BrowserAPIView> = {};
  private get window(): HTMLElement {
    const windowNode = document.getElementById(consts.GAME_WINDOW_ID);

    if (!windowNode) {
      throw new Error(
        'BrowserAPI Error: you can\'t use property "window" before call of method "renderGameWindow"'
      );
    }

    return windowNode;
  }

  public renderGameWindow(): void {
    Helper.createRoot();
    Helper.createWindow();
  }
  public clearAll(): void {
    document.body.innerHTML = '';
  }
  public render(changes: VirtualDOMChange[]): void {
    changes.forEach((change) => {
      switch (change.action) {
        case 'mount': {
          this.mount(change.gameObject);
          break;
        }
        case 'unmount': {
          this.unmount(change.gameObject);
          break;
        }
        default: {
          this.update(change.gameObject);
        }
      }
    });
  }

  private mount(gameObject: GameObjectStruct): void {
    const view = new BrowserAPIView(gameObject);

    view.createElement();
    view.applyActualChange();

    this.window.appendChild(view.element);
    this.elementsMap[view.id] = view;
  }
  private update(gameObject: GameObjectStruct) {
    const newView = new BrowserAPIView(gameObject);
    const oldView = this.elementsMap[gameObject.id];

    newView.setElement(oldView.element);
    newView.applyActualChange();

    this.window.appendChild(newView.element);
    this.elementsMap[gameObject.id] = newView;
  }
  private unmount(gameObject: GameObjectStruct): void {
    this.elementsMap[gameObject.id].element.remove();
    delete this.elementsMap[gameObject.id];
  }
}
