import { el, RedomComponent } from 'redom';

export default abstract class Page implements RedomComponent {

  private headingElem = el('h1', "");
  private subheadingElem = el('h2', "");
  private header = el('header', [
    this.headingElem,
    this.subheadingElem,
    el('hr')
  ]); 

  protected content = el('div.content.pure-g');

  el = el('div.view.pure-u-1', this.header, this.content);

  set heading(text: string) {
    this.headingElem.textContent = text;
  }

  set subheading(text: string) {
    this.subheadingElem.textContent = text;
  }
  
  constructor(heading: string, subheading: string) {
    this.heading = heading;
    this.subheading = subheading;
  }

}
