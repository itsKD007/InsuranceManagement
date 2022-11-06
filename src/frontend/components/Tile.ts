import { el, RedomComponent, setChildren } from 'redom';

import Icon from './Icon';

export class TilesContainer implements RedomComponent {
  el = el('div.tiles-container.pure-g')
  constructor(tiles?: Tile[]) {
    if(typeof tiles != 'undefined')
      this.setTiles(tiles);
  }
  setTiles(tiles: Tile[]) {
    setChildren(this, tiles);
  }
}

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
