import { el, RedomComponent } from 'redom';

import Icon from './Icon';

export default class MenuButton implements RedomComponent {

  el = el('div.menu-button', new Icon('menu'));

  onClick(handler: () => void) {
    this.el.addEventListener('click', _event => {
      handler();
    });
  }

}
