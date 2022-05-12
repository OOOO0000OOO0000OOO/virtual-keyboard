export default class Controller {
  constructor(keyboard, output) {
    this.keyboard = keyboard;
    this.output = output;

    document.onkeydown = this.handleDownEvent.bind(this);
    document.onkeyup = this.handleUpEvent.bind(this);

    this.keyboard.container.node.onmousedown = this.handleMouseDownEvent.bind(this);
    this.keyboard.container.node.onmouseup = this.handleMouseUpEvent.bind(this);
  }

  /**
   *
   * @param {KeyboardEvent} event
   */

  handleDownEvent(event) {
    event.stopPropagation();

    const key = this.keyboard.buttons.find((_key) => _key.code === event.code);
    if (!key) return;
    if (this.keyboard.keysPressed[key.code]) return;
    if (!key.isFnKey) event.preventDefault();
    this.output.node.focus();

    const keyButton = key.button.node;
    keyButton.classList.add('active');

    if (event.code === 'Tab' || event.code === 'Alt') event.preventDefault();

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.keyboard.shiftKey = true;
      this.keyboard.switchCase();
    }

    if (event.code === 'ControlLeft' || event.code === 'ControlRight') this.keyboard.ctrlKey = true;
    if (event.code === 'AltLeft' || event.code === 'AltRight') this.keyboard.altKey = true;
    if (((event.code === 'ControlLeft' || event.code === 'ControlRight') && this.keyboard.altKey)
      || ((event.code === 'AltLeft' || event.code === 'AltRight') && this.keyboard.ctrlKey)) this.keyboard.switchLayout();

    if (event.code === 'CapsLock' && !this.keyboard.isCaps) {
      this.keyboard.isCaps = true;
      this.keyboard.switchCaps();
    } else if (event.code === 'CapsLock' && this.keyboard.isCaps) {
      this.keyboard.isCaps = false;
      this.keyboard.switchCaps();
      keyButton.classList.remove('active');
    }

    this.keyboard.keysPressed[key.code] = key;
  }

  /**
   *
   * @param {KeyboardEvent} event
   */

  handleUpEvent(event) {
    event.stopPropagation();

    const key = this.keyboard.buttons.find((_key) => _key.code === event.code);
    if (!key) return;

    this.output.node.focus();

    if (!event.isTrusted || (!key.isFnKey && event.isTrusted) || key.code === 'Tab') this.createOutputStream(key, event);

    this.keyboard.reset(event.code, key);

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.keyboard.shiftKey = false;
      this.keyboard.switchCase();
    }

    if (event.code === 'ControlLeft' || event.code === 'ControlRight') this.keyboard.ctrlKey = false;
    if (event.code === 'AltLeft' || event.code === 'AltRight') this.keyboard.altKey = false;

    if (event.code !== 'CapsLock') key.button.node.classList.remove('active');
  }

  /**
   *
   * @param {MouseEvent} event
   */

  handleMouseDownEvent(event) {
    const buttonNodes = this.keyboard.buttons.map((btn) => btn.letter.node);
    if (!buttonNodes.includes(event.target)) return;

    const { code } = this.keyboard.buttons[buttonNodes.indexOf(event.target)];

    document.dispatchEvent(new KeyboardEvent('keydown', { code }));
  }

  /**
   *
   * @param {MouseEvent} event
   */

  handleMouseUpEvent(event) {
    const buttonNodes = this.keyboard.buttons.map((btn) => btn.letter.node);
    if (!buttonNodes.includes(event.target)) return;

    const { code } = this.keyboard.buttons[buttonNodes.indexOf(event.target)];

    document.dispatchEvent(new KeyboardEvent('keyup', { code }));
  }

  createOutputStream(key, event) {
    const buttonNodes = this.keyboard.buttons.map((btn) => btn.letter.node);

    const { isFnKey } = key;
    const char = isFnKey ? '' : buttonNodes[this.keyboard.buttons.indexOf(key)];

    this.output.createOutput(event.code, char.textContent);
  }
}
