import { el, RedomComponent, setChildren } from 'redom';
import Scene from 'scenejs';

import Icon from './Icon';

export class TilesContainer implements RedomComponent {
  private animate = true;
  el = el('div.tiles-container.pure-g')
  constructor(tiles?: Tile[], animate: boolean = true) {
    if(typeof tiles != 'undefined')
      this.setTiles(tiles);
    this.animate = animate;
  }
  setTiles(tiles: Tile[]) {
    setChildren(this, tiles);
  }
  async onmount() {
    if(!this.animate) return;
    await new Promise(resolve => {
      new Scene({
        '.tile-container': (i: number) => ({
          0: {
            transform: { scale: 0 },
            opacity: 0
          },
          1: {
            transform: { scale: 1 },
            opacity: 1
          },
          options: {
            delay: 0.1 * i,
            duration: 0.5,
            fillMode: 'forwards'
          }
        })
      }, {
        selector: true,
        easing: 'ease-in-out',
        iterationCount: 1
      }).playCSS().on('ended', resolve);
    });
  }
}

export default class Tile implements RedomComponent {

  private tileElem = el('div.tile');
  el = el('div.tile-container.pure-u-1-3', this.tileElem)

  constructor(iconName: string, label: string, bgColor: string = "#dddddd") {
    this.tileElem.style.backgroundColor = bgColor
    this.tileElem.addEventListener('click', _event => {
      this.clickHandler();
    });
    setChildren(this.tileElem, [
      new Icon(iconName),
      el('div.tile-label', label),
    ]);
  }

  clickHandler() {}

  onClick(handler: () => void) {
    this.clickHandler = handler;
  }

}
