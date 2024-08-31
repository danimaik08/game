import GameObjectAPI from '~/GameObject/GameObjectAPI';

export type RenderAPIType = 'browser' | 'fake';

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

  abstract renderView(gameObject: GameObjectAPI): void;
}
