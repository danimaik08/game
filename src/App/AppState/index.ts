import RenderAPI from '~/RenderAPI';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import VirtualDOM from '~/VirtualDOM';

import { AppStateName } from './types';

export default abstract class AppState {
  private renderAPI: RenderAPI;
  private virtualDOM: VirtualDOM;

  public stateName: AppStateName;

  constructor() {
    this.renderAPI = getRenderAPI();
    this.virtualDOM = new VirtualDOM();
    this.stateName = 'menu';
  }

  public doFrameBehavior() {
    this.render();
  }

  protected render() {
    this.renderAPI.render(this.virtualDOM.getChanges());
    this.virtualDOM.prepareForNewFrame();
  }
}
