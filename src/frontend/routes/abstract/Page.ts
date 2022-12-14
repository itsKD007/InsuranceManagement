import { el, RedomComponent } from 'redom';

import { easyAnimate, getClassSelector } from '../../utils';

export default abstract class Page implements RedomComponent {

  private headingElem = el('h1', "");
  private subheadingElem = el('h2', "");
  private header = el('header', [
    this.headingElem,
    this.subheadingElem,
    el('hr')
  ]); 

  protected content = el('div.content');

  el = el('div.view.pure-u-1', this.header, this.content);

  set heading(text: string) {
    this.headingElem.textContent = text;
  }

  set subheading(text: string) {
    this.subheadingElem.textContent = text;
  }
  
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

  constructor(heading: string, subheading: string) {
    this.heading = heading;
    this.subheading = subheading;
  }

}
