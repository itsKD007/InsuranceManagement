import 'iconify-icon';

import { el, RedomComponent, setAttr } from 'redom';

export default class Icon implements RedomComponent {

  el = el('iconify-icon');

  constructor(iconName: string) {
    setAttr(this, { icon: iconName })
  }

}
