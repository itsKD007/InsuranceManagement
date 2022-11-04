import { el, RedomComponent } from 'redom';

export default class Services implements RedomComponent {

  header = el('header',
    el('h1', "Services"),
    el('h2', "Use Our Services"),
    el('hr'));

  el = el('div.view.pure-u-1', this.header);

}
