import { GameObjectAPI } from '~/GameObject';
import RenderAPI from './index';

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

  renderView(gameObject: GameObjectAPI, style?: string): void {
    console.log('renderView');
  }
}
