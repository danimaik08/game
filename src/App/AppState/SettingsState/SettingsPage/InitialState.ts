import SettingsPageState from './SettingsPageState';

export default class InitialState extends SettingsPageState {
  constructor(chosenOptionIdx: number) {
    super(chosenOptionIdx);
    this.stateName = 'initial';
  }

  public processKeyboard(): void {}
  public addToRenderElements(): void {
    super.addToRenderElements();
  }
}
