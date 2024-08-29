import * as consts from '~/shared/consts';
import RenderAPI from './index';

export default class BrowserAPI extends RenderAPI {
  private static addId(element: HTMLElement, id: string) {
    element.id = id;

    if (process.env.WITH_TESTS) {
      element.dataset.testid = id;
    }
  }

  renderGameWindow() {
    const body = document.querySelector('body') as HTMLBodyElement;
    const root = document.createElement('div');
    const window = document.createElement('div');

    BrowserAPI.addId(root, consts.ROOT_ID);
    BrowserAPI.addId(window, consts.GAME_WINDOW_ID);

    body.appendChild(root);
    root.appendChild(window);
  }

  clearAll() {
    document.body.innerHTML = '';
  }
}
