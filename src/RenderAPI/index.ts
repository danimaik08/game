import { VirtualDOMChange } from '~/VirtualDOM/types';

export type RenderAPIType = 'browser' | 'fake';

export default abstract class RenderAPI {
  public abstract renderGameWindow(): void;
  public abstract clearAll(): void;
  public abstract render(changes: VirtualDOMChange[]): void;
}
