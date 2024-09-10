export default class KeyboardController {
  private static instance: KeyboardController;
  private keys: Set<string>;

  constructor() {
    if (!KeyboardController.instance) {
      this.keys = new Set();
      KeyboardController.instance = this;
    }

    return KeyboardController.instance;
  }

  public addEventListeners() {
    document.addEventListener('keydown', (evt) => {
      this.keys.add(evt.key.toUpperCase());
    });

    document.addEventListener('keyup', (evt) => {
      this.keys.delete(evt.key.toUpperCase());
    });
  }

  public isActiveKey(key: string): boolean {
    return this.keys.has(key);
  }
}
