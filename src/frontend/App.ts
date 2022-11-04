import { el, RedomComponent, router, mount, unmount } from 'redom';

import MenuButton from './MenuButton';
import SideBar from './SideBar';
import Overlay from './Overlay';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import { Home, Dashboard, Products, Services, Login, AboutUs, Feedback } from './routes';
import { RouteName } from './constants';

export default class App implements RedomComponent {

  menuButton = new MenuButton();
  sideBar = new SideBar();
  viewRouter = router('main.pure-g', {
    'home': Home,
    'dashboard': Dashboard,
    'products': Products,
    'services': Services,
    'login': Login,
    'aboutUs': AboutUs,
    'feedback': Feedback
  });
  chatButton = new ChatButton();
  chatWindow = new ChatWindow();
  overlay = new Overlay();

  el = el('div.app', this.menuButton, this.sideBar, this.viewRouter, this.chatButton);

  setView(pageName: RouteName) {
    this.sideBar.setSelectedLink(pageName);
    this.viewRouter.update(pageName);
  }

  onmount() {
    this.setView('home');
  }

  constructor() {
    Object.keys(this.sideBar.links).forEach((key: RouteName) => {
      this.sideBar.links[key].el.addEventListener('click', _event => {
        this.setView(key);
        unmount(this, this.overlay)
        this.sideBar.hide();
      });
    });
    this.menuButton.el.addEventListener('click', _event => {
      this.sideBar.show();
      mount(this, this.overlay);
    });
    this.chatButton.onClick(() => {
      mount(this, this.chatWindow);
    });
    this.chatWindow.onClose(async () => {
      await this.chatWindow.animateClose();
      unmount(this, this.chatWindow);
    });
  }

}

