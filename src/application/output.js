import Control from '../common/control';

export default class OutputField {
  constructor() {
    this.field = new Control(null, 'textarea', 'output');

    [['placeholder', 'Start type something...'], ['rows', 5], ['cols', 50], ['spellcheck', false], ['autocorrect', 'off']].forEach(([attrName, attrValue]) => {
      this.field.node.setAttribute(attrName, attrValue);
    });
  }
}
