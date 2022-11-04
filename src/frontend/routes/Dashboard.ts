import { el, RedomComponent } from 'redom';

export default class Home implements RedomComponent {

  header = el('header',
    el('h1', "Dashboard"),
    el('h2', "Manage Your Account"),
    el('hr'));

  el = el('div.view.pure-u-1', this.header);

}
