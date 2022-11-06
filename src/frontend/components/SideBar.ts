import { el, RedomComponent } from 'redom';

import { RouteName } from '../constants';

class Link implements RedomComponent {
  private a = el('a.pure-menu-link');
  el = el('li.pure-menu-item', this.a);
  constructor(label: string) {
    this.a.textContent = label;
  }
  set label(linkLabel: string) {
    this.a.textContent = linkLabel;
  }
  onClick(handler: () => void) {
    this.el.addEventListener('click', _event => {
      handler();
    });
  }
  select() {
    this.el.classList.add('pure-menu-selected')
  }
  deselect() {
    this.el.classList.remove('pure-menu-selected')
  }
}

export default class SideBar implements RedomComponent {

  private links = {
    home: new Link('Home'),
    dashboard: new Link('Dashboard'),
    products: new Link('Products'),
    services: new Link('Services'),
    login: new Link('Login'),
    aboutUs: new Link('About Us'),
    feedback: new Link('Feedback')
  };

  private content = el('div.pure-menu.pure-menu-scrollable',
    el('a.pure-menu-heading', 'KDI Pvt. Ltd.'),
    el('ul.pure-menu-list', ...Object.values(this.links)));

  el = el('nav.sidebar', this.content);
  
  changeLinkLabel(linkName: RouteName, linkLabel: string) {
    this.links[linkName].label = linkLabel;
  }

  setSelectedLink(linkName: RouteName) {
    Object.values(this.links).forEach(link => {
      link.deselect();
    });
    this.links[linkName].select();
  }

  show() {
    this.el.classList.add('visible');
  }

  hide() {
    this.el.classList.remove('visible');
  }

  linkOnClick(linkName: RouteName, handler: () => void) {
    this.links[linkName].onClick(() => {
      handler();
    })
  }

  get linkNames() {
    return Object.keys(this.links);
  }

}
