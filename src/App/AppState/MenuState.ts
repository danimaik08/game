import GameObject from '~/structs/GameObject';
import Point from '~/structs/Point';
import Size from '~/structs/Size';
import Keyboard from '~/controllers/Keyboard';
import { KEY_ENTER, KEY_TOP, KEY_BOTTOM, KEY_ARROW_UP, KEY_ARROW_DOWN } from '~/consts';

import AppState from '.';

type MenuOption = 'new-game' | 'settings';
const menuChanges: MenuOption[] = ['new-game', 'settings'];

export default class MenuState extends AppState {
  private newGameButton: GameObject;
  private settingsButton: GameObject;
  private hint: GameObject;
  private header: GameObject;
  private currentMenuOptionIdx: number;

  constructor() {
    super();
    this.stateName = 'menu';
    this.currentMenuOptionIdx = 0;
    this.hint = new GameObject({
      text: 'Нажмите Enter, чтобы продолжить',
      point: new Point(20, 560),
      size: new Size(300, 30),
    });
    this.header = new GameObject({
      text: 'Главное меню',
      point: new Point(330, 260),
      size: new Size(150, 30),
    });
    this.newGameButton = new GameObject({ text: 'Новая игра', point: new Point(340, 300), size: new Size(100, 30) });
    this.settingsButton = new GameObject({ text: 'Настройки', point: new Point(340, 330), size: new Size(100, 30) });
  }

  private get currentMenuOption() {
    return menuChanges[this.currentMenuOptionIdx];
  }

  public doFrameBehavior() {
    this.processKeyboard();
    this.processCurrentChange();
    this.addToRenderElements();
    super.render();
  }

  private addToRenderElements() {
    this.virtualDOM.addElement(this.hint);
    this.virtualDOM.addElement(this.header);
    this.virtualDOM.addElement(this.newGameButton);
    this.virtualDOM.addElement(this.settingsButton);
  }
  private processKeyboard() {
    if (this.keyboard.isActiveKey(KEY_ENTER) && this.currentMenuOption === 'new-game') {
      this.stateName = 'playing';
    }
    if (this.keyboard.isActiveKey(KEY_ENTER) && this.currentMenuOption === 'settings') {
      this.stateName = 'settings';
    }
    if (this.keyboard.isActiveKey(KEY_ARROW_UP) || this.keyboard.isActiveKey(KEY_TOP)) {
      this.currentMenuOptionIdx = this.currentMenuOptionIdx <= 0 ? 0 : this.currentMenuOptionIdx - 1;
    }
    if (this.keyboard.isActiveKey(KEY_ARROW_DOWN) || this.keyboard.isActiveKey(KEY_BOTTOM)) {
      this.currentMenuOptionIdx =
        this.currentMenuOptionIdx >= menuChanges.length - 1 ? menuChanges.length - 1 : this.currentMenuOptionIdx + 1;
    }
  }
  private processCurrentChange() {
    this.newGameButton.textColor = this.currentMenuOption === 'new-game' ? '#f00' : '#000';
    this.settingsButton.textColor = this.currentMenuOption === 'settings' ? '#f00' : '#000';
  }
}
