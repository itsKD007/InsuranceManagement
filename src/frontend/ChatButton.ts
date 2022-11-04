import { el, RedomComponent } from 'redom';

import Icon from './Icon';

export default class MenuButton implements RedomComponent {

  el = el('div.chat-button', new Icon('mdi:chat-question-outline'));

  onClick(handler: () => void) {
    this.el.addEventListener('click', () => {
      handler();
    });
  }

}
