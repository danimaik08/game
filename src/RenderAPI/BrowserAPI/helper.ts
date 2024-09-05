import * as consts from '~/RenderAPI/consts';

import * as css from './css';

export function addId(element: HTMLElement, id: string): void {
  element.id = id;

  if (process.env.IS_TEST_MODE) {
    element.dataset.testid = id;
  }
}

export function createRoot() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const root = document.createElement('div');

  addId(root, consts.ROOT_ID);
  root.setAttribute('style', css.rootCSS);
  body.appendChild(root);
}

export function createWindow() {
  const root = document.getElementById(consts.ROOT_ID);

  if (!root) {
    throw new Error(
      `BrowserAPI Error: method "${createWindow.name}" - root not found`
    );
  }

  const window = document.createElement('div');

  addId(window, consts.GAME_WINDOW_ID);
  window.setAttribute('style', css.windowCSS);
  root.appendChild(window);
}
