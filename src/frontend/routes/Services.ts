import { el, RedomComponent, setChildren, mount, unmount } from 'redom';

import Page from './abstract/Page';
import Tile, { TilesContainer } from '../components/Tile';
import { ServiceName, Agent, storeList } from '../constants';
import { calculatePremium, easyAlert } from '../utils';
import { AppState } from '../App';

class StoreLocator implements RedomComponent {
  private thead = el('thead.kdi-thead', [
    'Store ID',
    'Address',
  ].map(text => el('th', text)));
  private tbody = el('tbody.kdi-tbody');
  private table = el('table.pure-table.pure-table-bordered', this.thead, this.tbody);
  el = el('div.table-container', this.table);
  constructor() {
    storeList.forEach(store => {
      mount(this.tbody, el('tr', [
        el('td', String(store.id)),
        el('td', store.address)
      ]));
    });
  }
}

class AgentLocator implements RedomComponent {
  private thead = el('thead.kdi-thead', [
    'Agent ID',
    'Name',
    'Phone Number',
    'Area Code'
  ].map(text => el('th', text)));
  private tbody = el('tbody.kdi-tbody');
  private table = el('table.pure-table.pure-table-bordered', this.thead, this.tbody);
  el = el('div.table-container', this.table);
  constructor() {
    this.init();
  }
  async init() {
    const res = await fetch('/api/agents');
    const agents: Agent[] = await res.json();
    agents.forEach(agent => {
      mount(this.tbody, el('tr', [
        el('td', String(agent.agentId)),
        el('td', agent.name),
        el('td', agent.phone),
        el('td', agent.areaCode)
      ]));
    });
  }
}

class PremiumCalculator implements RedomComponent {
  private baseAmountInput = el('input.pure-input-1', {
    type: 'number',
    name: 'base-amount',
    required: true,
    placeholder: "Base Amount",
    value: 5000,
    min: 5000
  }) as HTMLInputElement;
  private ageInput = el('input.pure-input-1', {
    type: 'number',
    name: 'age',
    required: true,
    placeholder: "Age",
    min: 18,
    max: 99
  }) as HTMLInputElement;
  private calculatePremiumButton = el('button.pure-button', "Calculate");
  private premiumAmountDisplay = el('div.premium-amount');
  el = el('form.pure-form.pure-form-stacked.kdi-form.form-premium-calculator',
    el('fieldset',
      el('label', {for: 'base-amount'}, "Base Amount"),
      this.baseAmountInput,
      el('label', {for: 'age'}, "Age"),
      this.ageInput,
      this.calculatePremiumButton));
  constructor() {
    this.calculatePremiumButton.addEventListener('click', event => {
      event.preventDefault();
      unmount(this, this.premiumAmountDisplay);
      if(!this.ageInput.validity.valid ||
        !this.baseAmountInput.validity.valid) {
        easyAlert(
          'error',
          "Error",
          "You must be at least 18 years of age with a minimum base amount of Rs. 5000."
        );
        return;
      }
      const baseAmount = parseInt(this.baseAmountInput.value);
      const age = parseInt(this.ageInput.value);
      this.premiumAmountDisplay.textContent =
        `Rs. ${calculatePremium(baseAmount, age).toFixed(2)}`;
      mount(this, this.premiumAmountDisplay);
    });
  }
}

export default class Services extends Page {

  private tiles = {
    agentLocator: new Tile(
      'map-marker',
      "Agent Locator",
      "#ddd4d4"
    ),
    storeLocator: new Tile(
      'store-marker',
      "Store Locator",
      "#ddd4dd"
    ),
    premiumCalculator: new Tile(
      'calculator',
      "Premium Calculator",
      "#d4ddd4"
    )
  }

  private tilesContainer = new TilesContainer(Object.values(this.tiles))

  private premiumCalculator = new PremiumCalculator();
  private storeLocator = new StoreLocator();
  private agentLocator = new AgentLocator();

  constructor() {
    super("Services", "Avail Our Services");
  }

  update(_appState: AppState) {
    Object.keys(this.tiles).forEach((tileName: ServiceName) => {
      this.tiles[tileName].onClick(async () => {
        switch(tileName) {
          case 'premiumCalculator':
            this.heading = 'Premium Calculator';
            this.subheading = 'Check Your Amount';
            await this.animateHide();
            setChildren(this.content, [this.premiumCalculator]);
            await this.animateShow();
            break;

          case 'storeLocator':
            this.heading = 'Store Locator';
            this.subheading = 'Find A Centre'
            await this.animateHide();
            setChildren(this.content, [this.storeLocator]);
            await this.animateShow();
            break;

          case 'agentLocator':
            this.heading = 'Agent Locator';
            this.subheading = 'Find Your Agent'
            await this.animateHide();
            setChildren(this.content, [this.agentLocator]);
            await this.animateShow();
            break;
        }
      });
    });
    this.heading = 'Services';
    this.subheading = 'Avail Our Services';
    setChildren(this.content, [this.tilesContainer]);
  }

}
