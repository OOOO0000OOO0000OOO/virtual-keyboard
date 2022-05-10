import Control from '../common/control';
import OutputField from './output';
import Keyboard from './keyboard';

export default class Application extends Control {
  init() {
    const output = new OutputField();
    const keyboard = new Keyboard([
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
    ]);

    this.node.append(
      new Control(this.node, 'h1', 'title', 'RSS Virtual Keyboard').node,
      output.field.node,
      keyboard.container.node,
      new Control(this.node, 'p', 'subtitle', 'This keyboard is designed for the Windows OS.').node,
      new Control(this.node, 'p', 'subtitle', 'Use left <kbd>Ctrl</kbd> + <kbd>Alt</kbd> to switch.').node,
    );
  }
}
