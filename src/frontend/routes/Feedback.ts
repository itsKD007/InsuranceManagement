import { el, RedomComponent } from 'redom';

import Icon from '../Icon';

export default class Feedback implements RedomComponent {

  header = el('header',
    el('h1', "Feedback"),
    el('h2', "Share Your Thoughts"),
    el('hr'));

  el = el('div.view.pure-u-1', this.header);

}
