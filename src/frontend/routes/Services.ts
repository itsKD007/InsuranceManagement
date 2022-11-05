import { el, setChildren } from 'redom';

import LoginRequisitePage from './abstract/LoginRequisitePage';

export default class Services extends LoginRequisitePage {

  constructor() {
    super("Services", "Avail Our Services")
    setChildren(this.content, [
      el('p', "Congrats, you're a prophet.")
    ]);
  }

}
