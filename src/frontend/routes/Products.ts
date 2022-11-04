import { el, RedomComponent } from 'redom';

import Icon from '../Icon';

export default class Products implements RedomComponent {

  header = el('header',
    el('h1', "Products"),
    el('h2', "Our Latest Policies",
    el('hr')));

  el = el('div.view.pure-u-1', this.header);

}
