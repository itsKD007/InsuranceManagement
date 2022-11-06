import { el, setChildren } from 'redom';

import LoginRequisitePage from './abstract/LoginRequisitePage';
import { Tile } from '../components';
import { AppState } from '../App';

export default class Dashboard extends LoginRequisitePage {

private tiles = {
    customer: {
      viewPolicies: new Tile(
        "mdi:eye",
        "View Policies",
        "#d7ddd4"
      ),
      manageAccount: new Tile(
        "mdi:account-cog",
        "Manage Account",
        "#dad4dd"
      ),
      managePayments: new Tile(
        "mdi:cash-multiple",
        "Manage Payments",
        "#d4ddd7"
      )
    },
    administrator: {
      accountInfo: new Tile(
        "mdi:book-information-variant",
        "Account Information",
        "#d8ddd4"
      ),
      manageAgents: new Tile(
        "mdi:account-tie",
        "Manage Agents",
        "#ddd9d4"
      ),
      managePolicies: new Tile(
        "mdi:file-cog",
        "Manage Policies",
        "#d4dddc"
      )
    }
  }

  constructor() {
    super("Dashboard", "Manage Your Account")
  }

  update(appState: AppState) {
    super.update(appState);
    if(!appState.isLoggedIn)
      return;
    switch(appState.user.type) {
      case 'customer':
        setChildren(
          this.contentWhenLoggedIn,
          Object.values(this.tiles.customer)
        );
        break;
      case 'agent':
        setChildren(
          this.contentWhenLoggedIn,
          Object.values(this.tiles.customer)
        );
        break;
      case 'administrator':
        setChildren(
          this.contentWhenLoggedIn,
          Object.values(this.tiles.administrator)
        );
        break;
    }
  }

}
