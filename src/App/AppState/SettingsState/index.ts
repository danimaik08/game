import GameObject from '~/structs/GameObject';
import { KEY_ESCAPE } from '~/consts';

import AppState from '../.';
import { HINT } from './layout';

export default class SettingsState extends AppState {
  private hint: GameObject;

  constructor() {
    super();
    this.stateName = 'settings';
    this.hint = HINT.clone();
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.addToRenderElements();

    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(this.hint);
  }
  private processKeyboard() {
    if (this.keyboard.isActiveKey(KEY_ESCAPE)) {
      this.stateName = 'menu';
    }
  }
}
