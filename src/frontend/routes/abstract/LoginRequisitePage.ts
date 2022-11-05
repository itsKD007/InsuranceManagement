import { el, mount } from 'redom';

import Page from './Page';
import { AppState } from '../../constants';

export default abstract class LoginRequisitePage extends Page {

  private loginWarning = el('p.warning', "You need to log in to use this feature!");
  protected content = el('div.content');

  constructor(heading: string, subheading: string) {
    super(heading, subheading);
  }

  update(appState: AppState) {
    if(!appState.isLoggedIn)
      mount(this, this.loginWarning);
    else
      mount(this, this.content);
  }

}
