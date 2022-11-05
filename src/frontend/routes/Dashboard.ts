import { el, setChildren } from 'redom';

import LoginRequisitePage from './abstract/LoginRequisitePage';

export default class Dashboard extends LoginRequisitePage {

  constructor() {
    super("Dashboard", "Manage Your Account")
    setChildren(this.contentWhenLoggedIn, [
      el('p', "Congrats, you're a prophet.")
    ]);
  }

}
