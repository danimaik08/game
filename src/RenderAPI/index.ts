import { VirtualDOMChange } from '~/VirtualDOM/types';

export type RenderAPIType = 'browser' | 'fake';

export default abstract class RenderAPI {
  private static instance: RenderAPI | null = null;

  constructor() {
    if (!RenderAPI.instance) {
      RenderAPI.instance = this;
    }

    return RenderAPI.instance;
  }
  public abstract renderGameWindow(): void;
  public abstract clearAll(): void;
  public abstract render(changes: VirtualDOMChange[]): void;
}
