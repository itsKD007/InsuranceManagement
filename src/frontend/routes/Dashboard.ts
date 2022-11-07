import { el, setChildren } from 'redom';

import LoginRequisitePage from './abstract/LoginRequisitePage';
import { Tile } from '../components';
import { AppState } from '../App';
import { TilesContainer } from '../components/Tile';

export default class Dashboard extends LoginRequisitePage {

  private greetingElem = el('div.greeting');

  private tiles = {
    customer: {
      viewPolicies: new Tile(
        "eye",
        "View Policies",
        "#d7ddd4"
      ),
      manageAccount: new Tile(
        "account-cog",
        "Manage Account",
        "#ddd6d4"
      ),
      managePayments: new Tile(
        "cash-multiple",
        "Manage Payments",
        "#d4ddd7"
      )
    },
    agent: {
      manageAccount: new Tile(
        "account-cog",
        "Manage Account",
        "#dddad4"
      ),
      manageCustomers: new Tile(
        "account-multiple",
        "Manage Customers",
        "#d9d4dd"
      ),
    },
    administrator: {
      manageAccount: new Tile(
        "account-cog",
        "Manage Account",
        "#d8ddd4"
      ),
      manageAgents: new Tile(
        "account-tie",
        "Manage Agents",
        "#ddd9d4"
      ),
      managePolicies: new Tile(
        "file-cog",
        "Manage Policies",
        "#d4dddc"
      )
    }
  }

  tilesContainer = new TilesContainer();

  constructor() {
    super("Dashboard", "Manage Your Account")
  }

  update(appState: AppState) {
    super.update(appState);
    if(!appState.isLoggedIn || appState.user == null)
      return;
    switch(appState.user.type) {
      case 'customer':
        this.tilesContainer.setTiles(
          Object.values(this.tiles.customer)
        );
        break;
      case 'agent':
        this.tilesContainer.setTiles(
          Object.values(this.tiles.agent)
        );
        break;
      case 'admin':
        this.tilesContainer.setTiles(
          Object.values(this.tiles.administrator)
        );
        break;
    }
    this.greetingElem.textContent = `Welcome, ${appState.user.name}`;
    setChildren(this.content, [
      this.greetingElem,
      this.tilesContainer
    ]);
  }

}
