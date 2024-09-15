import AppState from '../.';
import { HEADER, HINT } from './layout';
import KeysView from './KeysView';
import createKeysView from './createKeysView';
import { COLOR_CHOSEN, COLOR_DEFAULT, KEYS_VIEW_TYPES } from './consts';

export default class SettingsState extends AppState {
  private keysViewArray: KeysView[];
  private chosenOptionIdx: number;

  constructor() {
    super();
    this.stateName = 'settings';
    this.chosenOptionIdx = 0;
    this.keysViewArray = KEYS_VIEW_TYPES.map((type) => createKeysView(type));
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.changeColorOfKeysByChosenOption();
    this.changeKeysInPlaces();
    this.addToRenderElements();

    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(HINT);
    this.virtualDOM.addElement(HEADER);
    this.addToRenderKeysViewArray();
  }
  private addToRenderKeysViewArray() {
    this.keysViewArray.forEach((keysView) => {
      this.addToRenderKeysView(keysView);
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
  private processKeyboard() {
    if (this.keyboard.isActiveKey('ESCAPE')) {
      this.stateName = 'menu';
    }
  }
}
