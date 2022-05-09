export default class Control {
  /**
   * @param { String } tagName
   * @param { String } className
   * @param { HTMLElement } parentNode
   * @param { String } content
   */
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = content;
    if (parentNode) parentNode.appendChild(element);
    this.node = element;
  }
}
