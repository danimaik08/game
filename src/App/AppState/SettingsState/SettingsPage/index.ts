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
  private chosenOptionIdx: number;

  constructor() {
    if (!SettingsPage.instance) {
      this.stateNameBefore = 'initial';
      this.stateName = 'initial';
      this.chosenOptionIdx = 0;

      SettingsPage.instance = this;
    }

    return SettingsPage.instance;
  }

  public init() {
    clearTimeout(this.timer);
    this.timer = null;
    this.stateName = 'initial';
    this.stateNameBefore = 'initial';
    this.chosenOptionIdx = 0;
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
        this.state = new InitialState(this.chosenOptionIdx);
        this.timer = setTimeout(() => {
          if (this) {
            this.stateName = 'ready-to-edit';
          }
        }, SettingsPage.INITIAL_STATE_TIME);
        break;
      }
      case 'ready-to-edit': {
        this.chosenOptionIdx = this.state.chosenOptionIdx;
        this.state = new ReadyToEditState(this.chosenOptionIdx);
        break;
      }
      case 'editing': {
        this.chosenOptionIdx = this.state.chosenOptionIdx;
        this.state = new EditingState(this.chosenOptionIdx);
        break;
      }
    }
  }
}
