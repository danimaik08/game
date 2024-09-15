import Keyboard from '~/controllers/Keyboard';
import KeysStore from '~/stores/KeysStore';
import { Key, KeyChangeable } from '~/stores/KeysStore/types';

export default class KeyboardFacade {
  private static instance: KeyboardFacade;
  private keyboard: Keyboard;
  private keysStore: KeysStore;

  constructor() {
    if (!KeyboardFacade.instance) {
      this.keyboard = new Keyboard();
      this.keysStore = new KeysStore();
      KeyboardFacade.instance = this;
    }

    return KeyboardFacade.instance;
  }

  get lastKey() {
    return this.keyboard.lastKey;
  }

  public isActiveKey(key: Key): boolean {
    return this.keyboard.isActiveKey(this.getKey(key));
  }
  public getKey(key: Key) {
    return this.keysStore.getKey(key);
  }
  public setKey(key: KeyChangeable, value: string) {
    this.keysStore.setKey(key, value);
  }
}
