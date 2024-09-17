import Keyboard from './controller';
import KeysStore from './ControlKeysStore';
import RussianKeysAdapter from './RussianKeysAdapter';
import { Key as NameOfKey, KeyChangeable as NameOfChangeableKey } from './types';

export default class KeyboardFacade {
  private static instance: KeyboardFacade;
  private keyboard: Keyboard;
  private keysStore: KeysStore;

  constructor() {
    if (!KeyboardFacade.instance) {
      const russianKeysAdapter = new RussianKeysAdapter();

      this.keyboard = new Keyboard({
        keysConverter: (key) => russianKeysAdapter.convertKeyToEngFromSameButton(key.toUpperCase()),
      });

      this.keysStore = new KeysStore();
      KeyboardFacade.instance = this;
    }

    return KeyboardFacade.instance;
  }

  get lastKey() {
    return this.keyboard.lastKey;
  }

  public isActiveKey(key: NameOfKey): boolean {
    return this.keyboard.isActiveKey(this.getKey(key));
  }
  public getKey(key: NameOfKey) {
    return this.keysStore.getKey(key);
  }
  public setKey(key: NameOfChangeableKey, value: string) {
    this.keysStore.setKey(key, value);
  }
}
