export default class Keyboard {
  private static instance: Keyboard;
  private keys: Set<string>;

  constructor() {
    if (!Keyboard.instance) {
      this.keys = new Set();
      Keyboard.instance = this;

      document.addEventListener('keydown', (evt) => {
        this.keys.add(evt.key.toUpperCase());
      });

      document.addEventListener('keyup', (evt) => {
        this.keys.delete(evt.key.toUpperCase());
      });
    }

    return Keyboard.instance;
  }

  public isActiveKey(key: string): boolean {
    return this.keys.has(key.toUpperCase());
  }
}
