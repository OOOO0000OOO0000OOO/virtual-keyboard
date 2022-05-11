export default class Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;
    if (parentNode) parentNode.appendChild(element);
    this.node = element;
  }

  destroy() {
    this.node.remove();
  }
}
