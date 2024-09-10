/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/CollapseWidget.js
class CollapseWidget {
  constructor(parentEl, buttonText, text) {
    this.parentEl = parentEl;
    this.buttonText = buttonText;
    this.text = text;
    this.classes = this.constructor.classes;
    this.down = false;
  }
  static get classes() {
    return {
      widget: 'collapse-widget',
      button: 'button',
      collapse: 'collapse',
      content: 'content'
    };
  }
  static get markup() {
    return `
      <div>
        <button class="${this.classes.button}"></button>
      </div>
      <div class="${this.classes.collapse} animation">
        <p class="${this.classes.content}"></p>
      </div>
    `;
  }
  bindToDOM() {
    this.widget = document.createElement('div');
    this.widget.classList.add(this.classes.widget);
    this.widget.innerHTML = this.constructor.markup;
    this.button = this.widget.querySelector(`.${this.classes.button}`);
    this.button.innerText = this.buttonText;
    this.collapse = this.widget.querySelector(`.${this.classes.collapse}`);
    this.content = this.widget.querySelector(`.${this.classes.content}`);
    this.content.innerText = this.text;
    this.button.addEventListener('click', () => {
      this.collapse.style.height = this.down ? '0' : `${this.content.offsetHeight}px`;
      this.down = !this.down;
    });
    this.parentEl.appendChild(this.widget);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const collapseWidget = new CollapseWidget(document.getElementById('container1'), 'Collapse', 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.');
collapseWidget.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;