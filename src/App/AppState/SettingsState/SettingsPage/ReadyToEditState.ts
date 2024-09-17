import { DEFAULT_DEBOUNCE } from '~/consts';

import { KEYS_VIEW_TYPES, COLOR_CHOSEN, COLOR_DEFAULT } from '../consts';
import { HOW_TO_UNLOCK_EDIT_KEY_HINT } from '../layout';
import SettingsPageState from './SettingsPageState';

export default class ReadyToEditState extends SettingsPageState {
  private ableToChooseOptions: boolean;

  constructor(chosenOptionIdx: number) {
    super(chosenOptionIdx);
    this.stateName = 'ready-to-edit';
    this.ableToChooseOptions = true;
  }

  public processKeyboard(): void {
    this.processKeysForMovement();
    this.processEnterForSwitchOnEditingState();
  }
  public addToRenderElements(): void {
    this.virtualDOM.addElement(HOW_TO_UNLOCK_EDIT_KEY_HINT);
    super.changeKeysInPlaces();
    super.changeColorOfKeysByChosenOption();
    super.addToRenderElements();
  }

  private processEnterForSwitchOnEditingState() {
    if (this.keyboard.isActiveKey('ENTER')) {
      this.stateName = 'editing';
    }
  }
  private processKeysForMovement() {
    if (this.ableToChooseOptions) {
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
    this.ableToChooseOptions = false;
  }
  private unlockKeysForMovementByTimeout() {
    setTimeout(() => {
      if (this) {
        this.ableToChooseOptions = true;
      }
    }, DEFAULT_DEBOUNCE);
  }
}
