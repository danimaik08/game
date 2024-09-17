import VirtualDOM from '~/VirtualDOM';
import KeyboardFacade from '~/controllers/keyboard';

import KeysView from '../KeysView';
import { KEYS_VIEW_TYPES, COLOR_CHOSEN, COLOR_DEFAULT } from '../consts';
import { HEADER } from '../layout';
import createKeysView from '../createKeysView';
import { SettingsPageStateName } from './types';

export default abstract class SettingsPageState {
  protected virtualDOM: VirtualDOM;
  protected keyboard: KeyboardFacade;
  protected keysViewArray: KeysView[];

  public chosenOptionIdx: number;
  public stateName: SettingsPageStateName;

  constructor(chosenOptionIdx: number) {
    this.virtualDOM = new VirtualDOM();
    this.keyboard = new KeyboardFacade();
    this.keysViewArray = KEYS_VIEW_TYPES.map((type) => createKeysView(type));
    this.changeKeysInPlaces();
    this.changeColorOfKeysByChosenOption();
    this.chosenOptionIdx = chosenOptionIdx;
    this.stateName = 'initial';
  }

  public abstract processKeyboard(): void;
  public addToRenderElements(): void {
    this.addToRenderHeader();
    this.addToRenderKeysViewArray();
  }

  protected addToRenderHeader() {
    this.virtualDOM.addElement(HEADER);
  }
  protected addToRenderKeysViewArray() {
    this.keysViewArray.forEach((keysView) => {
      this.addToRenderKeysView(keysView);
    });
  }
  protected addToRenderKeysView(keysView: KeysView) {
    this.virtualDOM.addElement(keysView.caption);
    this.virtualDOM.addElement(keysView.place);
  }
  protected changeKeysInPlaces() {
    this.keysViewArray.forEach((keysView) => {
      keysView.place.text = this.keyboard.getKey(keysView.type);
    });
  }
  protected changeColorOfKeysByChosenOption() {
    this.keysViewArray.forEach((keysView, idx) => {
      const color = this.chosenOptionIdx === idx ? COLOR_CHOSEN : COLOR_DEFAULT;

      keysView.caption.textColor = color;
      keysView.place.textColor = color;
    });
  }
}
