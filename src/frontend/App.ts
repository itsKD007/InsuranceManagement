import { el, RedomComponent, router, mount, unmount } from 'redom';

import * as Component from './components';
import * as Route from './routes';
import { RouteName, User } from './constants';
import { easyAnimate, getClassSelector } from './utils';

export class AppState extends EventTarget {

  isLoggedIn: boolean = false;
  user: User | null = null;

  addEventListener(type: 'login' | 'register', callback: () => void) {
    super.addEventListener(type, callback);
  }

  dispatchEvent(event: Event): boolean {
    if(['login', 'register'].includes(event.type))
      return super.dispatchEvent(event);
    return false;
  }

}

export default class App implements RedomComponent {

  private state = new AppState();

  private elements = {
    menuButton: new Component.MenuButton(),
    sideBar: new Component.SideBar(),
    viewRouter: router('main.pure-g', {
      'home': Route.Home,
      'dashboard': Route.Dashboard,
      'products': Route.Products,
      'services': Route.Services,
      'login': Route.Login,
      'aboutUs': Route.AboutUs,
      'feedback': Route.Feedback
    }),
    chatButton: new Component.ChatButton(),
    chatWindow: new Component.ChatWindow(),
    overlay: new Component.Overlay()
  }

  el = el('div.app', [
    this.elements.menuButton,
    this.elements.sideBar,
    this.elements.viewRouter,
    this.elements.chatButton
  ]);

  async setView(pageName: RouteName) {
    this.elements.sideBar.setSelectedLink(pageName);
    this.elements.viewRouter.update(pageName, this.state);
    await easyAnimate(
      getClassSelector(
        <HTMLElement>this.elements.viewRouter.el
      ), [
        {
          opacity: '0',
          transform: { scale: '0.5', translateY: '50px' }
        },
        {
          opacity: '1',
          transform: { scale: '1', translateY: '0px' }
        }
      ]
    );
  }

  onmount() {
    this.setView('home');
  }

  constructor() {
    this.state.addEventListener('login', () => {
      this.elements.sideBar.changeLinkLabel('login', "Logout");
      this.setView('dashboard');
    });
    this.state.addEventListener('register', () => {
      this.setView('login');
    });
    this.elements.sideBar.linkNames.forEach((key: RouteName) => {
      this.elements.sideBar.linkOnClick(key, async () => {
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

