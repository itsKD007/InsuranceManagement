import { el, RedomComponent } from 'redom';

import Icon from '../Icon';

export default class Login implements RedomComponent {

  header = el('header',
    el('h1', "Login"),
    el('h2', "Login To Your Account"),
    el('hr'));

  el = el('div.view.pure-u-1', this.header);

}
