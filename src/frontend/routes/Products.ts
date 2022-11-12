import { el, setChildren } from 'redom';
import Swal from 'sweetalert2';

import Page from './abstract/Page';
import Tile, { TilesContainer } from '../components/Tile';
import { productDetails, ProductName } from '../constants';

class ProductWindow {
  title: string;
  text: string;
  show() {
    Swal.fire({
      title: this.title,
      html: this.text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#2592E6',
      background: '#f6f6f6',
      width: '800',
      customClass: {
        container: 'product-swal'
      }
    });
  }
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

  private productWindow = new ProductWindow();

  private tilesContainer = new TilesContainer(Object.values(this.tiles));

  constructor() {
    super("Products", "Our Latest Policies");
    setChildren(this.content, [this.tilesContainer]);
    Object.keys(this.tiles).forEach((tileName: ProductName) => {
      this.tiles[tileName].onClick(() => {
        this.productWindow.title = productDetails[tileName].title;
        this.productWindow.text = productDetails[tileName].text.split('\n').join('<br>');
        this.productWindow.show();
      });
    });
  }

}
