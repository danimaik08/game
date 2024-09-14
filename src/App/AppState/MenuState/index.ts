import GameObject from '~/structs/GameObject';
import { KEY_ENTER, KEY_TOP, KEY_BOTTOM, KEY_ARROW_UP, KEY_ARROW_DOWN } from '~/consts';

import AppState from '../.';
import { COLOR_CHOSEN, COLOR_DEFAULT, MENU_OPTIONS } from './consts';
import { HEADER, HINT, NEW_GAME_BUTTON, SETTINGS_BUTTON } from './layout';

export default class MenuState extends AppState {
  private newGameButton: GameObject;
  private settingsButton: GameObject;
  private hint: GameObject;
  private header: GameObject;
  private chosenOptionIdx: number;

  constructor() {
    super();
    this.stateName = 'menu';
    this.chosenOptionIdx = 0;
    this.hint = HINT.clone();
    this.header = HEADER.clone();
    this.newGameButton = NEW_GAME_BUTTON.clone();
    this.settingsButton = SETTINGS_BUTTON.clone();
  }

  private get chosenOption() {
    return MENU_OPTIONS[this.chosenOptionIdx];
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.processCurrentChange();
    this.addToRenderElements();
    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(this.hint);
    this.virtualDOM.addElement(this.header);
    this.virtualDOM.addElement(this.newGameButton);
    this.virtualDOM.addElement(this.settingsButton);
  }
  private processKeyboard() {
    if (this.keyboard.isActiveKey(KEY_ENTER) && this.chosenOption === 'new-game') {
      this.stateName = 'playing';
    }
    if (this.keyboard.isActiveKey(KEY_ENTER) && this.chosenOption === 'settings') {
      this.stateName = 'settings';
    }
    if (this.keyboard.isActiveKey(KEY_ARROW_UP) || this.keyboard.isActiveKey(KEY_TOP)) {
      this.chosenOptionIdx = this.chosenOptionIdx <= 0 ? 0 : this.chosenOptionIdx - 1;
    }
    if (this.keyboard.isActiveKey(KEY_ARROW_DOWN) || this.keyboard.isActiveKey(KEY_BOTTOM)) {
      const lastIdx = MENU_OPTIONS.length - 1;

      this.chosenOptionIdx = this.chosenOptionIdx >= lastIdx ? lastIdx : this.chosenOptionIdx + 1;
    }
  }
  private processCurrentChange() {
    this.newGameButton.textColor = this.chosenOption === 'new-game' ? COLOR_CHOSEN : COLOR_DEFAULT;
    this.settingsButton.textColor = this.chosenOption === 'settings' ? COLOR_CHOSEN : COLOR_DEFAULT;
  }
}
