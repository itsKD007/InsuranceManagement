import { el, mount, setChildren } from 'redom';

import { AppState } from '../App';
import Page from './abstract/Page';
import { LoginResponseBody, tileColors, tileIcons, UserType } from '../constants';

import { Tile } from '../components';
import { easyAlert, easyAnimate, getClassSelector } from '../utils';
import { textToParagraphs } from '../utils';
import { TilesContainer } from '../components/Tile';

export default class Login extends Page {

  private forms = {
    login: {
      inputs: {
      },
      submitButton: el('button')
    },
    register: {

    }
  }
  private logoutButton = el('button.pure-button', "Logout");
  private text = `Please click the button below to log out of your account.

You may also choose to simply close this browser window, and you'll be logged out automatically. We have chosen not to make user sessions persistent due to security reasons.

Before you leave, you may choose to fill up our feedback form if you want to bring something to our attention, or if you simply enjoyed the experience.

Have a great rest of your day, and we hope to see you again!`;
  private textElem = el('div.text', textToParagraphs(this.text));

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
    admin: new Tile(
      tileIcons.login.admin,
      "Administrator",
      tileColors.login.admin
    )
  };

  private tilesContainer = new TilesContainer(Object.values(this.tiles));

  animateHide() {
    return easyAnimate(
      getClassSelector(this.content), [
        { opacity: 1 }, { opacity: 0 }
      ], 0.2
    );
  }

  animateShow() {
    return easyAnimate(
      getClassSelector(this.content), [
        { opacity: 0 }, { opacity: 1 }
      ], 0.2
    );
  }

  constructor() {
    super("Login", "Access Your Account");
    mount(this, this.content);
  }

  showLogout() {
    this.heading = "Logout";
    this.subheading = "Leave Your Account";
    setChildren(this.content, [this.textElem, this.logoutButton]);
    this.logoutButton.addEventListener('click', () => {
      window.location.reload(); 
    });
  }

  update(appState: AppState) {
    if(appState.isLoggedIn) {
      this.showLogout();
      return;
    }
    setChildren(this.content, [this.tilesContainer]);
    Object.keys(this.tiles).forEach((tileName: UserType) => {
      this.tiles[tileName].onClick(async () => {
        const res = await fetch('/api/login', {
          method: 'post',
          body: JSON.stringify({
            username: "hola",
            password: "12345678",
            type: tileName
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: LoginResponseBody = await res.json();
        if(!data.success || data.user == null) {
          if(data.error != null) {
            easyAlert('error', "Error", data.error);
          }
          return;
        }
        await this.animateHide();
        appState.isLoggedIn = true;
        appState.user = data.user;
        this.showLogout();
        easyAlert('success', "Welcome", `You are now logged in as ${data.user.username}`);
        this.animateShow();
        appState.dispatchEvent(new Event('login'));
      });
    });
  }

}
