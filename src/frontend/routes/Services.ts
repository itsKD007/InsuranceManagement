import { setChildren } from 'redom';

import Page from './abstract/Page';
import Tile from '../components/Tile';

export default class Services extends Page {

  private tiles = {
    agentLocator: new Tile(
      'mdi:map-marker',
      "Agent Locator",
      "#ddd4d4"
    ),
    storeLocator: new Tile(
      'mdi:store-marker',
      "Store Locator",
      "#ddd4dd"
    ),
    premiumCalculator: new Tile(
      'mdi:calculator',
      "Premium Calculator",
      "#d4ddd4"
    )
  }

  constructor() {
    super("Services", "Avail Our Services");
    setChildren(this.content, Object.values(this.tiles));
  }

}
