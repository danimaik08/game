import GameObject from '~/structs/GameObject';

import AppState from '../.';
import { COLOR_CHOSEN, COLOR_DEFAULT, MENU_OPTIONS } from './consts';
import { HEADER, HINT, NEW_GAME_BUTTON, SETTINGS_BUTTON } from './layout';

export default class MenuState extends AppState {
  private newGameButton: GameObject;
  private settingsButton: GameObject;
  private chosenOptionIdx: number;

  constructor() {
    super();
    this.stateName = 'menu';
    this.chosenOptionIdx = 0;
    this.newGameButton = NEW_GAME_BUTTON.clone();
    this.settingsButton = SETTINGS_BUTTON.clone();
  }

  private get chosenOption() {
    return MENU_OPTIONS[this.chosenOptionIdx];
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.changeColorOfButtonsByChosenOption();
    this.addToRenderElements();
    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(HINT);
    this.virtualDOM.addElement(HEADER);
    this.virtualDOM.addElement(this.newGameButton);
    this.virtualDOM.addElement(this.settingsButton);
  }
  private processKeyboard() {
    this.processPressingEnter();
    this.processKeysForChoiceOfOption();
  }
  private processPressingEnter() {
    if (this.keyboard.isActiveKey('ENTER')) {
      if (this.chosenOption === 'new-game') {
        this.stateName = 'playing';
      }
      if (this.chosenOption === 'settings') {
        this.stateName = 'settings';
      }
    }
  }
  private processKeysForChoiceOfOption() {
    this.processKeysForMovementToTop();
    this.processKeysForMovementToBottom();
  }
  private processKeysForMovementToTop() {
    if (this.keyboard.isActiveKey('ARROWUP') || this.keyboard.isActiveKey('TOP')) {
      this.chosenOptionIdx = this.chosenOptionIdx <= 0 ? 0 : this.chosenOptionIdx - 1;
    }
  }
  private processKeysForMovementToBottom() {
    if (this.keyboard.isActiveKey('ARROWDOWN') || this.keyboard.isActiveKey('BOTTOM')) {
      const lastIdx = MENU_OPTIONS.length - 1;

      this.chosenOptionIdx = this.chosenOptionIdx >= lastIdx ? lastIdx : this.chosenOptionIdx + 1;
    }
  }
  private changeColorOfButtonsByChosenOption() {
    this.newGameButton.textColor = this.chosenOption === 'new-game' ? COLOR_CHOSEN : COLOR_DEFAULT;
    this.settingsButton.textColor = this.chosenOption === 'settings' ? COLOR_CHOSEN : COLOR_DEFAULT;
  }
}
