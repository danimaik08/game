import { KeyChangeable, KeyReadonly, Key } from './types';
import { PREFIX, READONLY, DEFAULT } from './consts';

export default class KeysStore {
  private static instance: KeysStore;

  constructor() {
    if (!KeysStore.instance) {
      KeysStore.instance = this;
    }

    return KeysStore.instance;
  }

  public getKey(type: Key): string {
    if (READONLY.has(type as KeyReadonly)) {
      return type;
    }

    const localStorageItem = localStorage.getItem(PREFIX + type);

    if (localStorageItem) {
      return localStorageItem;
    }

    return DEFAULT[type as KeyChangeable];
  }
  public setKey(type: KeyChangeable, value: string) {
    localStorage.setItem(PREFIX + type, value);
  }
}
