import { el, RedomComponent } from 'redom';

import Icon from '../Icon';

export default class AboutUs implements RedomComponent {

  header = el('header',
    el('h1', "About Us"),
    el('h2', "A Bit Of Background"),
    el('hr'));

  el = el('div.view.pure-u-1', this.header);

}
