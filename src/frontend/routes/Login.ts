import { el, mount, setChildren } from 'redom';

import Page from './abstract/Page';
import { AppState, LoginResponse, tileColors, tileIcons } from '../constants';
import Tile from '../Tile';
import { animateHide, animateShow, getClassSelector } from '../utils';
import Swal from 'sweetalert2';

export default class Login extends Page {

  private content = el('div.content.pure-g');
  private loginForm = el('form');
  private logoutButton = el('button.pure-button', "Logout");

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

  animateHide() {
    return animateHide(getClassSelector(this.content), 0.2);
  }

  onSubmit(handler: () => void) {
    handler();
  }

  constructor() {
    super("Login", "Access Your Account");
    mount(this, this.content);
  }

  showLogout() {
    this.heading = "Logout";
    this.subheading = "Leave Your Account";
    setChildren(this.content, [this.logoutButton]);
    this.logoutButton.addEventListener('click', () => {
      window.location.reload(); 
    });
  }

  update(appState: AppState) {
    if(appState.isLoggedIn) {
      this.showLogout();
    } else {
      setChildren(this.content, Object.values(this.tiles));
      Object.values(this.tiles).forEach(tile => {
        tile.onClick(async () => {
          const res = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify({
              username: "itskd007",
              password: "12345678"
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data: LoginResponse = await res.json();
          if(data.success) {
            await animateHide(getClassSelector(this.content), 0.2);
            appState.isLoggedIn = true;
            appState.user = data.user;
            Swal.fire({
                title: 'Welcome',
                text: "Successfully Logged In!",
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2592E6',
                iconColor: '#4ce078',
                background: '#f6f6f6'
            });
            this.showLogout();
            animateShow(getClassSelector(this.content), 0.2);
          }
        });
      });
    }
  }

}
