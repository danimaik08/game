import * as consts from '~/shared/consts';
import RenderAPI from '~/RenderAPI';
import { GameObjectAPI } from '~/GameObject';

import * as Helper from './helper';
import { rootCSS, windowCSS } from './css';

export default class BrowserAPI extends RenderAPI {
  private elementsMap: Record<string, HTMLElement> = {};
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
    const body = document.querySelector('body') as HTMLBodyElement;
    const root = document.createElement('div');
    const window = document.createElement('div');

    Helper.addId(root, consts.ROOT_ID);
    Helper.addId(window, consts.GAME_WINDOW_ID);

    root.setAttribute('style', rootCSS);
    window.setAttribute('style', windowCSS);

    body.appendChild(root);
    root.appendChild(window);
  }
  clearAll(): void {
    document.body.innerHTML = '';
  }

  private mountGameObject(gameObjectAPI: GameObjectAPI, style: string = '') {
    const id = gameObjectAPI.getId();
    const view = document.createElement('div');

    Helper.addId(view, id);
    Helper.setViewStyle(
      view,
      gameObjectAPI.getPoint(),
      gameObjectAPI.getSize(),
      style
    );

    this.window.appendChild(view);
    this.elementsMap[id] = view;
  }
  renderView(gameObjectAPI: GameObjectAPI, style: string = ''): void {
    const id = gameObjectAPI.getId();
    const view: HTMLElement | null = this.elementsMap[id] ?? null;

    if (view === null) {
      this.mountGameObject(gameObjectAPI, style);
    } else {
      Helper.setViewStyle(
        view,
        gameObjectAPI.getPoint(),
        gameObjectAPI.getSize(),
        style
      );
    }
  }
}
