import { el, RedomComponent } from 'redom';

import Icon from './Icon';

export default class MenuButton implements RedomComponent {

  el = el('div.menu-button', new Icon('menu'));

  clickHandler() {}

  constructor() {
    this.el.addEventListener('click', _event => {
      this.clickHandler();
    });
  }

  onClick(handler: () => void) {
    this.clickHandler = handler;
  }

}
