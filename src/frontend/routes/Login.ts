import { el } from 'redom';

import Page from './abstract/Page';
import { AppState } from '../constants';

export default class Login extends Page {

  private content = el('div.content');

  constructor() {
    super("Login", "Access Your Account");
  }

  update(appState: AppState) {
    if(appState.isLoggedIn) {
      this.heading = "Logout";
      this.subheading = "Leave Your Account";
    }
  }

}
