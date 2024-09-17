import { SettingsPageStateName } from './types';
import InitialState from './InitialState';
import ReadyToEditState from './ReadyToEditState';
import EditingState from './EditingState';
import SettingsPageState from './SettingsPageState';

export default class SettingsPage {
  private static INITIAL_STATE_TIME = 200;
  private static instance: SettingsPage;
  private timer: NodeJS.Timeout;
  private state: SettingsPageState;
  private stateNameBefore: SettingsPageStateName;

  constructor() {
    if (!SettingsPage.instance) {
      this.stateNameBefore = 'initial';
      this.stateName = 'initial';

      SettingsPage.instance = this;
    }

    return SettingsPage.instance;
  }

  public init() {
    clearTimeout(this.timer);
    this.timer = null;
    this.stateName = 'initial';
    this.stateNameBefore = 'initial';
  }
  public doFrameBehavior() {
    this.state.processKeyboard();
    this.state.addToRenderElements();
    this.applyNewState();
  }

  private applyNewState() {
    if (this.stateName !== this.stateNameBefore) {
      this.stateNameBefore = this.state.stateName;
      this.stateName = this.state.stateName;
    }
  }

  private get stateName(): SettingsPageStateName {
    return this.state.stateName;
  }
  private set stateName(newState: SettingsPageStateName) {
    clearTimeout(this.timer);

    switch (newState) {
      case 'initial': {
        this.state = new InitialState();
        this.timer = setTimeout(() => {
          if (this) {
            this.stateName = 'ready-to-edit';
          }
        }, SettingsPage.INITIAL_STATE_TIME);
        break;
      }
      case 'ready-to-edit': {
        this.state = new ReadyToEditState();
        break;
      }
      case 'editing': {
        this.state = new EditingState();
        break;
      }
    }
  }
}
