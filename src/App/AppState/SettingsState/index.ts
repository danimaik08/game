import AppState from '../.';
import { ESCAPE_HINT } from './layout';
import SettingsPage from './SettingsPage';

export default class SettingsState extends AppState {
  private settingsPage: SettingsPage;

  constructor() {
    super();
    this.stateName = 'settings';
    this.settingsPage = new SettingsPage();
    this.settingsPage.init();
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.settingsPage.doFrameBehavior();
    this.virtualDOM.addElement(ESCAPE_HINT);

    super.render();
  }

  private processKeyboard() {
    this.processEscapeForExit();
  }

  private processEscapeForExit() {
    if (this.keyboard.isActiveKey('ESCAPE')) {
      this.stateName = 'menu';
    }
  }
}
