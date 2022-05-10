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

    this.output.node.focus();

    const keyButton = key.button.node;

    keyButton.classList.add('active');

    if (event.key === 'Tab') event.preventDefault();

    if (event.key === 'CapsLock' && !this.keyboard.isCaps) {
      this.keyboard.isCaps = true;
    } else if (event.key === 'CapsLock' && this.keyboard.isCaps) {
      this.keyboard.isCaps = false;
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

    this.keyboard.reset(event.code);

    if (event.key !== 'CapsLock') key.button.node.classList.remove('active');
  }
}
