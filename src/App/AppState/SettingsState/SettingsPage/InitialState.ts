import SettingsPageState from './SettingsPageState';

export default class InitialState extends SettingsPageState {
  constructor() {
    super();
    this.stateName = 'initial';
  }

  public processKeyboard(): void {}
  public addToRenderElements(): void {
    super.addToRenderHeader();
    super.addToRenderKeysViewArray();
  }
}
