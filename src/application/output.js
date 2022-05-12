import Control from '../common/control';

export default class OutputField extends Control {
  constructor() {
    super(null, 'textarea', 'output');

    [['placeholder', 'Start typing something...'], ['spellcheck', false], ['autocorrect', 'off']]
      .forEach(([attrName, attrValue]) => {
        this.node.setAttribute(attrName, attrValue);
      });
  }

  createOutput(code, char = '') {
    let cursor = this.node.selectionStart;

    const before = this.node.value.slice(0, cursor);
    const after = this.node.value.slice(cursor);

    const width = Math.round((this.node.clientWidth - 20) / 10.9);
    const valueLength = this.node.value.length;

    this.outputHandlers = {
      Tab: () => {
        cursor += 1;
        this.node.value = `${before}\t${after}`;
      },
      ArrowLeft: () => {
        cursor = (cursor > 0 ? cursor - 1 : 0);
      },
      ArrowRight: () => {
        cursor += 1;
      },
      ArrowUp: () => {
        const rows = before.split('\n').reverse();
        if (rows.length === 1 || rows[0].length > width) {
          cursor = (cursor - width >= 0 ? cursor - width : 0);
        } else {
          cursor = rows[0].length > rows[1].length ? before.lastIndexOf('\n') : (before.lastIndexOf('\n') - rows[1].length + rows[0].length);
        }
      },
      ArrowDown: () => {
        const rows = after.split('\n');
        if (rows.length === 1 || rows[0].length > width) {
          cursor = (cursor + width <= valueLength ? cursor + width : valueLength);
        } else {
          const lineLeft = before.lastIndexOf('\n') === -1 ? cursor % width : cursor - before.lastIndexOf('\n');
          cursor += after.indexOf('\n') + (lineLeft > rows[1].length ? rows[1].length + 1 : lineLeft);
        }
      },
      Enter: () => {
        this.node.value = `${before}\n${after}`;
        cursor += 1;
      },
      Delete: () => {
        this.node.value = `${before}${after.slice(1)}`;
      },
      Backspace: () => {
        this.node.value = `${before.slice(0, -1)}${after}`;
        cursor -= 1;
      },
      Key: () => {
        cursor += 1;
        this.node.value = `${before}${char}${after}`;
      },
    };

    if (this.outputHandlers[code]) this.outputHandlers[code]();
    if (char) this.outputHandlers.Key();

    this.node.setSelectionRange(cursor, cursor);
  }
}
