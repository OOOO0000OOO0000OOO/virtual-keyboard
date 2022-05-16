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
    this.cursor = this.node.selectionStart;

    const { selectionEnd } = this.node;
    const before = this.node.value.slice(0, this.cursor);
    const after = this.node.value.slice(this.cursor);
    const afterSelection = this.node.value.slice(selectionEnd);

    this.outputHandlers = {
      Tab: () => {
        this.cursor += 1;
        this.node.value = `${before}\t${after}`;
      },
      ArrowLeft: () => {
        this.cursor = (this.cursor > 0 ? this.cursor - 1 : 0);
      },
      ArrowRight: () => {
        this.cursor += 1;
      },
      ArrowUp: () => {
        this.cursor += 1;
      },
      ArrowDown: () => {
        this.cursor = (this.cursor > 0 ? this.cursor - 1 : 0);
      },
      Enter: () => {
        this.node.value = `${before}\n${after}`;
        this.cursor += 1;
      },
      Delete: () => {
        this.node.value = (this.cursor === selectionEnd)
          ? `${before}${after.slice(1)}`
          : `${before}${afterSelection}`;
      },
      Backspace: () => {
        this.node.value = (this.cursor === selectionEnd)
          ? `${before.slice(0, -1)}${after}`
          : `${before}${afterSelection}`;
        if (this.cursor === selectionEnd) this.cursor -= 1;
      },
      Key: () => {
        this.node.value = (this.cursor === selectionEnd)
          ? `${before}${char}${after}`
          : `${before}${char}${afterSelection}`;
        this.cursor += 1;
      },
    };

    if (this.outputHandlers[code]) this.outputHandlers[code]();
    if (char) this.outputHandlers.Key();

    this.node.setSelectionRange(this.cursor, this.cursor);
  }
}
