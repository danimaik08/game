import RenderAPI from '~/RenderAPI';
import getRenderAPI from '~/RenderAPI/getRenderAPI';
import VirtualDOM from '~/VirtualDOM';

import { AppStateName } from './types';

export default abstract class AppState {
  private renderAPI: RenderAPI;
  protected virtualDOM: VirtualDOM;

  public stateName: AppStateName;

  constructor() {
    this.renderAPI = getRenderAPI();
    this.virtualDOM = new VirtualDOM();
  }

  public abstract doFrameBehavior(): void;

  protected render() {
    this.renderAPI.render(this.virtualDOM.getChanges());
    this.virtualDOM.prepareForNewFrame();
  }
}
