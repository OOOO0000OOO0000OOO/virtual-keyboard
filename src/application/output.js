import Control from '../common/control';

export default class OutputField extends Control {
  constructor() {
    super(null, 'textarea', 'output');

    [['placeholder', 'Start typing something...'], ['spellcheck', false], ['autocorrect', 'off']]
      .forEach(([attrName, attrValue]) => {
        this.node.setAttribute(attrName, attrValue);
      });
  }
}
