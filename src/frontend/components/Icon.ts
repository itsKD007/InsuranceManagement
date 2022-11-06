import { el, RedomComponent } from 'redom';

export default class Icon implements RedomComponent {

  el = el('span.mdi');

  constructor(iconName: string) {
    this.el.classList.add(`mdi-${iconName}`);
  }

}
