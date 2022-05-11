import Control from '../common/control';
import Key from './key';

export default class Keyboard {
  constructor(keys, rows) {
    this.rows = rows;
    this.keys = keys;

    this.keysLayout = 'en';
    this.keysPressed = {};
    this.isCaps = false;

    this.container = new Control(null, 'div', 'keyboard');
    this.buttons = [];

    this.rows.forEach((row) => {
      const keyboardRow = new Control(this.container.node, 'div', 'keyboard__row');
      row.forEach((code) => {
        const key = keys[this.keysLayout].find((_key) => _key.code === code);
        if (key) {
          const keyButton = new Key(key);
          if (!this.buttons.includes(keyButton)) this.buttons.push(keyButton);
          keyboardRow.node.appendChild(keyButton.button.node);
        }
      });
    });
  }

  reset(eventCode) {
    if (!this.keysPressed[eventCode]) return;
    delete this.keysPressed[eventCode];
  }

  switchCase() {
    this.buttons.map((button) => (button.switchCase()));
  }

  switchCaps() {
    this.buttons.map((button) => (
      button.small.toUpperCase() === button.shift ? button.switchCase() : button));
  }

  switchLayout() {
    this.keysLayout = (this.keysLayout === 'en' ? 'ru' : 'en');
    this.buttons.map((button) => {
      if (button.isFnKey) return button;
      const key = this.keys[this.keysLayout].find((_key) => _key.code === button.code);
      return button.set(key);
    });
    if (this.isCaps) this.switchCaps();
    if (this.shiftKey) this.switchCase();
  }
}
