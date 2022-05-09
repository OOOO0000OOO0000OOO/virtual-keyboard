import Control from '../common/control';

export default class Key {
  constructor({
    small,
    shift,
    code,
    isFnKey = false,
  }) {
    this.code = code;
    this.small = small;
    this.shift = shift;
    this.isFnKey = isFnKey;

    this.button = new Control(null, 'div', `keyboard__key fn__${this.isFnKey} key__${this.code}`);
    this.letter = new Control(this.button.node, 'div', 'letter', this.small);
  }
}
