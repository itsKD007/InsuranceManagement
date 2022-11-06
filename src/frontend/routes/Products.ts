import { setChildren } from 'redom';

import Page from './abstract/Page';
import Tile from '../components/Tile';

export default class Products extends Page {

  private tiles = {
    home: new Tile(
      'mdi:home',
      "Home Insurance",
      "#d0d5dd"
    ),
    health: new Tile(
      'mdi:heart',
      "Health Insurance",
      "#ddd4d4"
    ),
    life: new Tile(
      'mdi:heart-pulse',
      "Life Insurance",
      "#dbd4dd"
    ),
    travel: new Tile(
      'mdi:bag-suitcase',
      "Travel Insurance",
      "#d4dddb"
    ),
    twoWheeler: new Tile(
      'mdi:motorbike',
      "2 Wheeler Insurance",
      "#dcddd4"
    ),
    fourWheeler: new Tile(
      'mdi:car',
      "4+ Wheeler Insurance",
      "#ddd8d4"
    )
  };

  constructor() {
    super("Products", "Our Latest Policies");
    setChildren(this.content, Object.values(this.tiles));
  }

}
