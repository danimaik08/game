import { VirtualDOMChange } from '~/VirtualDOM/types';

import RenderAPI from '.';

export default class FakeAPI extends RenderAPI {
  constructor() {
    super();
  }

  renderGameWindow() {
    console.log('renderGameWindow');
  }
  clearAll() {
    console.log('clearAll');
  }

  render(changes: VirtualDOMChange[]): void {
    console.log('render');
  }
}
