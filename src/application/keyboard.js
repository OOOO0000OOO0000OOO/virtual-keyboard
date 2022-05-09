import Control from '../common/control';
import Key from './key';
import keys from './keys';

export default class Keyboard {
  constructor(rows) {
    this.rows = rows;

    this.keysLayout = 'en';
    this.container = new Control(null, 'div', 'keyboard');

    this.rows.forEach((row) => {
      const keyboardRow = new Control(this.container.node, 'div', 'keyboard__row');
      row.forEach((code) => {
        const keyObj = keys[this.keysLayout].find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          keyboardRow.node.appendChild(keyButton.button);
        }
      });
    });
  }
}
