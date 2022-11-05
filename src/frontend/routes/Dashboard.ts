import { el, setChildren } from 'redom';

import LoginRequisitePage from './abstract/LoginRequisitePage';
import { Tile } from '../components';

export default class Dashboard extends LoginRequisitePage {

  private tiles = {
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
  }

  constructor() {
    super("Dashboard", "Manage Your Account")
    setChildren(this.contentWhenLoggedIn, Object.values(this.tiles));
  }

}
