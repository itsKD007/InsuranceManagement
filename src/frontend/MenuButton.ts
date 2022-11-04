import { el, RedomComponent } from 'redom';

import Icon from './Icon';

export default class MenuButton implements RedomComponent {

  el = el('div.menu-button', new Icon('mdi:menu'));

}
