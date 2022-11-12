import { el, setChildren } from 'redom';

import Page from './abstract/Page';
import Tile, { TilesContainer } from '../components/Tile';

class ProductWindow {

}

export default class Products extends Page {

  private tiles = {
    home: new Tile(
      'home',
      "Home Insurance",
      "#d0d5dd"
    ),
    health: new Tile(
      'heart',
      "Health Insurance",
      "#ddd4d4"
    ),
    life: new Tile(
      'heart-pulse',
      "Life Insurance",
      "#dbd4dd"
    ),
    travel: new Tile(
      'bag-suitcase',
      "Travel Insurance",
      "#d4dddb"
    ),
    twoWheeler: new Tile(
      'motorbike',
      "2 Wheeler Insurance",
      "#dcddd4"
    ),
    fourWheeler: new Tile(
      'car',
      "4+ Wheeler Insurance",
      "#ddd8d4"
    )
  };

  private tilesContainer = new TilesContainer(Object.values(this.tiles));

  constructor() {
    super("Products", "Our Latest Policies");
    setChildren(this.content, [this.tilesContainer]);
  }

}
