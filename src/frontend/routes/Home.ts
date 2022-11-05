import { el, mount } from 'redom';
import { textToParagraphs } from '../utils';

import Page from './abstract/Page';

export default class Home extends Page {

  private text = `We are happy to have you here. Please use the sidebar to navigate our app. You may need to log in to use certain features. If ever you need help, please do not hesistate to use the chat box.

We hope you have a pleasant experience using our app!

If you liked using or application, or want us to improve anything, please leave us some feedback. We value your thoughts more than anyone!`;

  private textElem = el('div.text', textToParagraphs(this.text));

  constructor() {
    super("Home", "Welcome to KD Insurance!");

    mount(this.content, this.textElem);
  }

}
