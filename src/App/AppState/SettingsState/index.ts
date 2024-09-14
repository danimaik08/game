import { KEY_ESCAPE } from '~/consts';

import AppState from '../.';
import { HINT } from './layout';

export default class SettingsState extends AppState {
  constructor() {
    super();
    this.stateName = 'settings';
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.addToRenderElements();

    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(HINT);
  }
  private processKeyboard() {
    if (this.keyboard.isActiveKey(KEY_ESCAPE)) {
      this.stateName = 'menu';
    }
  }
}
