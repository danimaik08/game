import { VirtualDOMChange } from '~/VirtualDOM/types';

import RenderAPI from '.';

export default class FakeAPI extends RenderAPI {
  constructor() {
    super();
  }

  public renderGameWindow() {
    console.log('renderGameWindow');
  }
  public clearAll() {
    console.log('clearAll');
  }
  public render(changes: VirtualDOMChange[]): void {
    console.log('render');
  }
}
