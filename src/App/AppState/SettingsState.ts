import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';
import { KEY_ESCAPE } from '~/consts';

import AppState from '.';

export default class SettingsState extends AppState {
  private hint: GameObject;

  constructor() {
    super();
    this.stateName = 'settings';
    this.hint = new GameObject({
      text: 'Нажмите Escape, чтобы выйти назад в меню',
      point: new Point(20, 560),
      size: new Size(350, 30),
    });
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
