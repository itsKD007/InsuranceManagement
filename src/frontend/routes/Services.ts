import { setChildren } from 'redom';

import Page from './abstract/Page';
import Tile from '../components/Tile';

export default class Services extends Page {

  private tiles = {
    agentLocator: new Tile(
      'mdi:map-marker',
      "Agent Locator"
    ),
    storeLocator: new Tile(
      'mdi:store-marker',
      "Store Locator"
    ),
    premiumCalculator: new Tile(
      'mdi:calculator',
      "Premium Calculator"
    )
  }

  constructor() {
    super("Services", "Avail Our Services");
    setChildren(this.content, Object.values(this.tiles));
  }

}
