import AppState from '../.';
import KeysView from './KeysView';
import createKeysView from './createKeysView';
import { HEADER, ESCAPE_HINT, HOW_TO_UNLOCK_EDIT_KEY_HINT, HOW_TO_EDIT_KEY_HINT } from './layout';
import { COLOR_CHOSEN, COLOR_DEFAULT, KEYS_VIEW_TYPES, SELECT_ITEM_DELAY } from './consts';

export default class SettingsState extends AppState {
  private static FRAMES_BEFORE_TOGGLE_VISIBILITY = 25;
  private static PREVENT_USING_EDITING_MODE_DELAY = 200;
  private keysViewArray: KeysView[];
  private chosenOptionIdx: number;
  private forbiddenChoiceOptions: boolean;
  private isEditingMode: boolean;
  private isInvisibleEditingKey: boolean;
  private framesCount: number;
  private allowSwitchOnEditingMode: boolean;

  constructor() {
    super();
    this.stateName = 'settings';
    this.chosenOptionIdx = 0;
    this.keysViewArray = KEYS_VIEW_TYPES.map((type) => createKeysView(type));
    this.forbiddenChoiceOptions = false;
    this.allowSwitchOnEditingMode = false;
    setTimeout(() => {
      if (this) {
        this.allowSwitchOnEditingMode = true;
      }
    }, SettingsState.PREVENT_USING_EDITING_MODE_DELAY);
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.changeColorOfKeysByChosenOption();
    this.changeKeysInPlaces();
    this.addToRenderElements();

    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(ESCAPE_HINT);
    this.virtualDOM.addElement(HEADER);
    this.addToRenderKeysViewArray();
    this.addToRenderHintAboutEditing();
  }
  private addToRenderKeysViewArray() {
    this.keysViewArray.forEach((keysView, idx) => {
      if (this.isEditingMode && this.chosenOptionIdx === idx) {
        if (!this.isInvisibleEditingKey) {
          this.addToRenderKeysView(keysView);
        }

        this.framesCount++;

        if (this.framesCount > SettingsState.FRAMES_BEFORE_TOGGLE_VISIBILITY) {
          this.framesCount = 0;
          this.isInvisibleEditingKey = !this.isInvisibleEditingKey;
        }
      } else {
        this.addToRenderKeysView(keysView);
      }
    });
  }
  private addToRenderKeysView(keysView: KeysView) {
    this.virtualDOM.addElement(keysView.caption);
    this.virtualDOM.addElement(keysView.place);
  }
  private changeColorOfKeysByChosenOption() {
    this.keysViewArray.forEach((keysView, idx) => {
      const color = this.chosenOptionIdx === idx ? COLOR_CHOSEN : COLOR_DEFAULT;

      keysView.caption.textColor = color;
      keysView.place.textColor = color;
    });
  }
  private changeKeysInPlaces() {
    this.keysViewArray.forEach((keysView) => {
      keysView.place.text = this.keyboard.getKey(keysView.type);
    });
  }
  private addToRenderHintAboutEditing() {
    this.virtualDOM.addElement(this.isEditingMode ? HOW_TO_EDIT_KEY_HINT : HOW_TO_UNLOCK_EDIT_KEY_HINT);
  }
  private processKeyboard() {
    this.processEscapeForExit();
    this.processEnterForSwitchOnEditingMode();
    this.processKeysForChoiceOfOption();
    this.applyNewKey();
  }
  private applyNewKey() {
    if (this.isEditingMode && !['ESCAPE', 'ENTER'].includes(this.keyboard.lastKey)) {
      const keyType = this.keysViewArray[this.chosenOptionIdx].type;

      this.keyboard.setKey(keyType, this.keyboard.lastKey);
      this.isEditingMode = false;
    }
  }
  private processEnterForSwitchOnEditingMode() {
    if (this.allowSwitchOnEditingMode && !this.isEditingMode && this.keyboard.isActiveKey('ENTER')) {
      this.framesCount = 0;
      this.isEditingMode = true;
      this.isInvisibleEditingKey = true;
    }
  }
  private processEscapeForExit() {
    if (this.keyboard.isActiveKey('ESCAPE')) {
      this.stateName = 'menu';
    }
  }
  private processKeysForChoiceOfOption() {
    if (!this.forbiddenChoiceOptions) {
      this.processKeysForMovementToTop();
      this.processKeysForMovementToBottom();
    }
  }
  private processKeysForMovementToTop() {
    if (this.keyboard.isActiveKey('ARROWUP') || this.keyboard.isActiveKey('TOP')) {
      this.chosenOptionIdx = this.chosenOptionIdx <= 0 ? 0 : this.chosenOptionIdx - 1;
      this.lockKeysForMovement();
      this.unlockKeysForMovementByTimeout();
    }
  }
  private processKeysForMovementToBottom() {
    if (this.keyboard.isActiveKey('ARROWDOWN') || this.keyboard.isActiveKey('BOTTOM')) {
      const lastIdx = KEYS_VIEW_TYPES.length - 1;

      this.chosenOptionIdx = this.chosenOptionIdx >= lastIdx ? lastIdx : this.chosenOptionIdx + 1;
      this.lockKeysForMovement();
      this.unlockKeysForMovementByTimeout();
    }
  }
  private lockKeysForMovement() {
    this.forbiddenChoiceOptions = true;
  }
  private unlockKeysForMovementByTimeout() {
    setTimeout(() => {
      if (this) {
        this.forbiddenChoiceOptions = false;
      }
    }, SELECT_ITEM_DELAY);
  }
}
