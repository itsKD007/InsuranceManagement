import { el, RedomComponent, setChildren } from 'redom';

import Icon from './Icon';

export default class Tile implements RedomComponent {

  private tileElem = el('div.tile');
  el = el('div.tile-container.pure-u-1-3', this.tileElem)

  constructor(iconName: string, label: string, bgColor: string = "#dddddd") {
    this.tileElem.style.backgroundColor = bgColor
    setChildren(this.tileElem, [
      new Icon(iconName),
      el('div.tile-label', label),
    ]);
  }

  onClick(handler: () => void) {
    this.tileElem.addEventListener('click', _event => {
      handler()
    });
  }

}
