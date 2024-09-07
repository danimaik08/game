import * as consts from '~/RenderAPI/consts';
import RenderAPI from '~/RenderAPI';
import GameObjectAPI, { GameObjectId } from '~/GameObject/GameObjectAPI';
import { VirtualDOMChange } from '~/VirtualDOM/types';

import * as Helper from './helper';
import BrowserAPIView from './BrowserAPIView';

export default class BrowserAPI extends RenderAPI {
  private elementsMap: Record<GameObjectId, BrowserAPIView> = {};
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

  private mount(gameObjectAPI: GameObjectAPI): void {
    const view = new BrowserAPIView(gameObjectAPI);

    view.applyActualChange();

    this.window.appendChild(view.element);
    this.elementsMap[view.id];
  }
  private unmount(gameObjectAPI: GameObjectAPI): void {
    this.elementsMap[gameObjectAPI.id].element.remove();
    delete this.elementsMap[gameObjectAPI.id];
  }
  render(changes: VirtualDOMChange[]): void {
    console.log('changes', changes);

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
          this.elementsMap[change.id].applyActualChange();
        }
      }
    });
  }
}
