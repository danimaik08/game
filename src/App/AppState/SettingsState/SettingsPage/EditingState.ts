import PartTimeMaker from '~/shared/PartTimeMaker';

import SettingsPageState from './SettingsPageState';
import { HOW_TO_EDIT_KEY_HINT } from '../layout';

export default class EditingState extends SettingsPageState {
  private static readonly PART_TIME_MAKER_SETTINGS = { callsBeforeToggleIsMaking: 25, isMaking: false };

  private partTimeMaker: PartTimeMaker;

  constructor() {
    super();
    this.stateName = 'editing';
    this.partTimeMaker = new PartTimeMaker(EditingState.PART_TIME_MAKER_SETTINGS);
  }

  public processKeyboard(): void {
    this.applyNewKey();
  }
  public addToRenderElements(): void {
    super.changeColorOfKeysByChosenOption();
    this.virtualDOM.addElement(HOW_TO_EDIT_KEY_HINT);
    super.addToRenderElements();
  }

  protected addToRenderKeysViewArray() {
    this.keysViewArray.forEach((keysView, idx) => {
      if (this.chosenOptionIdx === idx) {
        this.partTimeMaker.tryToMake(() => {
          this.addToRenderKeysView(keysView);
        });
      } else {
        this.addToRenderKeysView(keysView);
      }
    });
  }
  private applyNewKey() {
    if (!['ESCAPE', 'ENTER'].includes(this.keyboard.lastKey)) {
      const keyType = this.keysViewArray[this.chosenOptionIdx].type;

      this.keyboard.setKey(keyType, this.keyboard.lastKey);
      this.stateName = 'ready-to-edit';
    }
  }
}
