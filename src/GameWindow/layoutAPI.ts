import * as consts from '~/shared/consts';

function addId(element: HTMLElement, id: string) {
  element.id = id;

  if (process.env.WITH_TESTS) {
    element.dataset.testid = id;
  }
}

export function createInitLayout() {
  const body = document.querySelector('body') as HTMLBodyElement;
  const root = document.createElement('div');
  const window = document.createElement('div');

  addId(root, consts.ROOT_ID);
  addId(window, consts.GAME_WINDOW_ID);

  body.appendChild(root);
  root.appendChild(window);
}

export function getGameWindow() {
  return {}; // layout object window
}

export function clearLayout() {
  document.body.innerHTML = '';
}
