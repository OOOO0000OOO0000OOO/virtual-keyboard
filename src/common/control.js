export default class Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);

    element.className = className;
    element.innerHTML = content;

    parentNode.appendChild(element);
    this.node = element;
  }
}
