import { el, RedomComponent, setChildren } from 'redom';

export default abstract class Page implements RedomComponent {

  header = el('header'); 

  el = el('div.view.pure-u-1', this.header);
  
  constructor(heading: string, subheading: string) {
    setChildren(this.header, [
      el('h1', heading),
      el('h2', subheading),
      el('hr')
    ]);
  }

}
