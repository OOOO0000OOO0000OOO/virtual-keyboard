export default class Controller {
  constructor(keyboard, output) {
    this.keyboard = keyboard;
    this.output = output;

    document.addEventListener('keydown', this.handleDownEvent.bind(this));
    document.addEventListener('keyup', this.handleUpEvent.bind(this));
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

    this.output.node.focus();

    const keyButton = key.button.node;
    keyButton.classList.add('active');

    if (event.key === 'Tab' || event.key === 'Alt') event.preventDefault();

    if (event.key === 'Shift') {
      this.keyboard.shiftKey = true;
      this.keyboard.switchCase();
    }

    if (event.key === 'Control') this.keyboard.ctrlKey = true;
    if (event.key === 'Alt') this.keyboard.altKey = true;
    if ((event.key === 'Control' && this.keyboard.altKey)
      || (event.key === 'Alt' && this.keyboard.ctrlKey)) this.keyboard.switchLayout();

    if (event.key === 'CapsLock' && !this.keyboard.isCaps) {
      this.keyboard.isCaps = true;
      this.keyboard.switchCaps();
    } else if (event.key === 'CapsLock' && this.keyboard.isCaps) {
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

    this.keyboard.reset(event.code, key);

    if (event.key === 'Shift') {
      this.keyboard.shiftKey = false;
      this.keyboard.switchCase();
    }

    if (event.key === 'Control') this.keyboard.ctrlKey = false;
    if (event.key === 'Alt') this.keyboard.altKey = false;

    if (event.key !== 'CapsLock') key.button.node.classList.remove('active');
  }
}
