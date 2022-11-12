import { el, RedomComponent } from 'redom';

import Icon from './Icon';

export default class MenuButton implements RedomComponent {

  el = el('div.chat-button', new Icon('chat-question-outline'));

  constructor() {
    this.el.addEventListener('click', () => {
      this.clickHandler();
    });
  }

  clickHandler() {}

  onClick(handler: () => void) {
    this.clickHandler = handler;
  }

}
