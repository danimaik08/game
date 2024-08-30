import * as consts from '~/RenderAPI/consts';
import RenderAPI from '~/RenderAPI';
import { GameObjectAPI } from '~/GameObject';

import * as Helper from './helper';
import BrowserAPIView from './BrowserAPIView';

export default class BrowserAPI extends RenderAPI {
  private elementsMap: Record<string, BrowserAPIView> = {};
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

  private mountView(gameObjectAPI: GameObjectAPI): BrowserAPIView {
    const view = new BrowserAPIView(gameObjectAPI);

    this.window.appendChild(view.element);
    this.elementsMap[view.id] = view;

    return view;
  }
  renderView(gameObjectAPI: GameObjectAPI, style: string = ''): void {
    const view: BrowserAPIView | null =
      this.elementsMap[gameObjectAPI.id] ?? null;

    if (view === null) {
      this.mountView(gameObjectAPI).addStyle(style);
      return;
    }

    view.addStyle(style);
  }
}
