export default abstract class RenderAPI {
  private static instance: RenderAPI | null = null;

  constructor() {
    if (!RenderAPI.instance) {
      RenderAPI.instance = this;
    }

    return RenderAPI.instance;
  }
  abstract renderGameWindow(): void;
  abstract clearAll(): void;
}

export type RenderAPIType = 'browser' | 'fake';
