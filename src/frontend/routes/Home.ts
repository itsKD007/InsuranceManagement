import { el, mount, setChildren } from 'redom';

import Page from './abstract/Page';

export default class Home extends Page {

  text = `We are happy to have you here. Please use the sidebar to navigate our app. You may need to log in to use certain features. If ever you need help, please do not hesistate to use the chat box.

We hope you have a pleasant experience using our app!

If you liked using or application, or want us to improve anything, please leave us some feedback. We value your thoughts more than anyone!`;

  textElem = el('div.text');

  constructor() {
    super("Home", "Welcome to KD Insurance!");

    setChildren(this.textElem, this.text.split('\n\n').map(text => el('p', text)));
    mount(this, this.textElem);
  }

}
