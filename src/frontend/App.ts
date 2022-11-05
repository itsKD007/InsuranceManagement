import { el, RedomComponent, router, mount, unmount } from 'redom';
import Scene from 'scenejs';

import MenuButton from './MenuButton';
import SideBar from './SideBar';
import Overlay from './Overlay';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import * as Route from './routes';
import { AppState, RouteName } from './constants';

export default class App implements RedomComponent {

  state: AppState = {
    isLoggedIn: false,
    user: null
  };

  elements = {
    menuButton: new MenuButton(),
    sideBar: new SideBar(),
    viewRouter: router('main.pure-g', {
      'home': Route.Home,
      'dashboard': Route.Dashboard,
      'products': Route.Products,
      'services': Route.Services,
      'login': Route.Login,
      'aboutUs': Route.AboutUs,
      'feedback': Route.Feedback
    }),
    chatButton: new ChatButton(),
    chatWindow: new ChatWindow(),
    overlay: new Overlay()
  }

  el = el('div.app', [
    this.elements.menuButton,
    this.elements.sideBar,
    this.elements.viewRouter,
    this.elements.chatButton
  ]);

  async animateShowView() {
    await new Promise(resolve => {
      new Scene({
        'div.view': {
          0: "opacity: 0;",
          1: "opacity: 1;"
        }
      }, {
          selector: true,
          duration: 0.5,
          easing: 'ease'
      }).playCSS().on('ended', resolve);
    });
  }

  async setView(pageName: RouteName) {
    this.elements.sideBar.setSelectedLink(pageName);
    this.elements.viewRouter.update(pageName, this.state);
    await this.animateShowView();
  }

  onmount() {
    this.setView('home');
  }

  constructor() {
    Object.keys(this.elements.sideBar.links).forEach((key: RouteName) => {
      this.elements.sideBar.links[key].onClick(async () => {
        this.setView(key);
        unmount(this, this.elements.overlay)
        this.elements.sideBar.hide();
      });
    });
    this.elements.menuButton.onClick(() => {
      this.elements.sideBar.show();
      mount(this, this.elements.overlay);
    });
    this.elements.chatButton.onClick(() => {
      mount(this, this.elements.chatWindow);
    });
    this.elements.chatWindow.onClose(async () => {
      await this.elements.chatWindow.animateClose();
      unmount(this, this.elements.chatWindow);
    });
  }

}

