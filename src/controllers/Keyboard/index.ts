export default class Keyboard {
  private static instance: Keyboard;
  private keys: Set<string>;
  private innerLastKey: string;

  constructor() {
    if (!Keyboard.instance) {
      this.keys = new Set();
      Keyboard.instance = this;

      document.addEventListener('keydown', (evt) => {
        const key = evt.key.toUpperCase();

        this.keys.add(key);
        this.innerLastKey = key;
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
  public get lastKey() {
    return this.innerLastKey;
  }
}
