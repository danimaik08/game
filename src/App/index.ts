import RenderAPI from '~/RenderAPI';
import getRenderAPI from '~/RenderAPI/getRenderAPI';

import GameLoop from './GameLoop';
import GameWindow from './GameWindow';
import AppState from './AppState';
import { AppStateName } from './AppState/types';
import PlayingState from './AppState/PlayingState';
import MenuState from './AppState/MenuState';
import SettingsState from './AppState/SettingsState';

export default class App {
  private static instance: App;
  private renderAPI: RenderAPI;
  private gameLoop: GameLoop;

  private state: AppState;
  private stateNameBefore: AppStateName;

  constructor() {
    if (!App.instance) {
      this.renderAPI = getRenderAPI();
      this.gameLoop = new GameLoop();

      this.stateName = 'menu';
      this.stateNameBefore = this.state.stateName;

      App.instance = this;
    }

    return App.instance;
  }

  private get stateName(): AppStateName {
    return this.state.stateName;
  }
  private set stateName(newState: AppStateName) {
    switch (newState) {
      case 'playing': {
        this.state = new PlayingState();
        break;
      }
      case 'settings': {
        this.state = new SettingsState();
        break;
      }
      case 'menu': {
        this.state = new MenuState();
        break;
      }
    }
  }

  public start() {
    const gameWindow = new GameWindow(this.renderAPI);

    gameWindow.render();

    this.gameLoop.start(() => {
      this.state.doFrameBehavior();
      this.applyNewState();
    });
  }

  private applyNewState() {
    if (this.stateName !== this.stateNameBefore) {
      this.stateNameBefore = this.state.stateName;
      this.stateName = this.state.stateName;
    }
  }
}
