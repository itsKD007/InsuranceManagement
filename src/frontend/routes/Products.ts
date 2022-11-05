import { setChildren } from 'redom';

import Page from './abstract/Page';
import Tile from '../components/Tile';

export default class Products extends Page {

  private tiles = {
    home: new Tile(
      'mdi:home',
      "Home Insurance"
    ),
    health: new Tile(
      'mdi:heart',
      "Health Insurance"
    ),
    life: new Tile(
      'mdi:heart-pulse',
      "Life Insurance"
    ),
    travel: new Tile(
      'mdi:bag-suitcase',
      "Travel Insurance"
    ),
    twoWheeler: new Tile(
      'mdi:motorbike',
      "2 Wheeler Insurance"
    ),
    fourWheeler: new Tile(
      'mdi:car',
      "4+ Wheeler Insurance"
    )
  };

  constructor() {
    super("Products", "Our Latest Policies");
    setChildren(this.content, Object.values(this.tiles));
  }

}
