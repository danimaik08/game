type KeysConverterFunction = (key: string) => string;

export default class Keyboard {
  private static readonly DEFAULT_KEYS_CONVERTER: KeysConverterFunction = (key) => key;
  private static instance: Keyboard;
  private keys: Set<string>;
  private innerLastKey: string;
  private keysConverter: KeysConverterFunction;

  constructor(struct?: Partial<{ keysConverter: KeysConverterFunction }>) {
    if (!Keyboard.instance) {
      this.keys = new Set();
      this.keysConverter = struct?.keysConverter ?? Keyboard.DEFAULT_KEYS_CONVERTER;

      Keyboard.instance = this;

      document.addEventListener('keydown', (evt) => {
        const key = this.keysConverter(evt.key);

        this.keys.add(key);
        this.innerLastKey = key;
      });

      document.addEventListener('keyup', (evt) => {
        this.keys.delete(this.keysConverter(evt.key));
      });
    }

    return Keyboard.instance;
  }

  public isActiveKey(key: string): boolean {
    return this.keys.has(this.keysConverter(key));
  }
  public get lastKey() {
    return this.innerLastKey;
  }
}
