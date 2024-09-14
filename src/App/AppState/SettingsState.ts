import AppState from '.';

export default class SettingsState extends AppState {
  constructor() {
    super();
    this.stateName = 'settings';
  }

  public doFrameBehavior() {
    super.render();
  }
}
