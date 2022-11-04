import { el, RedomComponent } from 'redom';

export default class Home implements RedomComponent {

  text = `
We are happy to have you here. Please use the sidebar to navigate our app. You may need to log in to use certain features. If ever you need help, please do not hesistate to use the chat box.\n

We hope you have a pleasant experience using our app!\n

If you liked using or application, or want us to improve anything, please leave us some feedback. We value your thoughts more than anyone!
  `;

  textElem = el('div.text');

  header = el('header',
    el('h1', "Home"),
    el('h2', "Welcome to KD Insurance!"),
    el('hr'));

  el = el('div.view.pure-u-1', this.header, this.text.split('\n').map(text => el('p', text)));

}
