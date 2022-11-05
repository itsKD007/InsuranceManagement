import { el, mount, setChildren } from 'redom';

import Page from './abstract/Page';
import { AppState, tileColors, tileIcons } from '../constants';
import Tile from '../Tile';
import { animateHide, getClassSelector } from '../utils';

export default class Login extends Page {

  private content = el('div.content.pure-g');
  private loginForm = el('form');

  private tiles = {
    customer: new Tile(
      tileIcons.login.customer,
      "Customer",
      tileColors.login.customer
    ),
    agent: new Tile(
      tileIcons.login.agent,
      "Agent",
      tileColors.login.agent
    ),
    administrator: new Tile(
      tileIcons.login.administrator,
      "Administrator",
      tileColors.login.administrator
    )
  };

  constructor() {
    super("Login", "Access Your Account");
    Object.values(this.tiles).forEach(tile => {
      tile.onClick(() => {
        animateHide(getClassSelector(this.content), 0.2);
      });
    })
    mount(this, this.content);
  }

  update(appState: AppState) {
    if(appState.isLoggedIn) {
      this.heading = "Logout";
      this.subheading = "Leave Your Account";
    } else {
      setChildren(this.content, Object.values(this.tiles));
    }
  }

}
