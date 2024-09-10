import * as consts from '~/RenderAPI/consts';
import RenderAPI from '~/RenderAPI';
import { GameObjectStructure } from '~/structs/GameObject/types';
import { VirtualDOMChange } from '~/VirtualDOM/types';

import * as Helper from './helper';
import BrowserAPIView from './BrowserAPIView';

export default class BrowserAPI extends RenderAPI {
  private elementsMap: Record<GameObjectStructure['id'], BrowserAPIView> = {};
  private get window(): HTMLElement {
    const windowNode = document.getElementById(consts.GAME_WINDOW_ID);

    if (!windowNode) {
      throw new Error(
        'BrowserAPI Error: you can\'t use property "window" before call of method "renderGameWindow"'
      );
    }

    return windowNode;
  }

  renderGameWindow(): void {
    Helper.createRoot();
    Helper.createWindow();
  }
  clearAll(): void {
    document.body.innerHTML = '';
  }

  private mount(gameObject: GameObjectStructure): void {
    const view = new BrowserAPIView(gameObject);

    view.createElement();
    view.applyActualChange();

    this.window.appendChild(view.element);
    this.elementsMap[view.id] = view;
  }
  private update(gameObject: GameObjectStructure) {
    const newView = new BrowserAPIView(gameObject);
    const oldView = this.elementsMap[gameObject.id];

    newView.setElement(oldView.element);
    newView.applyActualChange();

    this.window.appendChild(newView.element);
    this.elementsMap[gameObject.id] = newView;
  }
  private unmount(gameObject: GameObjectStructure): void {
    this.elementsMap[gameObject.id].element.remove();
    delete this.elementsMap[gameObject.id];
  }
  render(changes: VirtualDOMChange[]): void {
    changes.forEach((change) => {
      switch (change.action) {
        case 'mount': {
          this.mount(change);
          break;
        }
        case 'unmount': {
          this.unmount(change);
          break;
        }
        default: {
          this.update(change);
        }
      }
    });
  }
}
