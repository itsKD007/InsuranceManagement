import { el, mount } from 'redom';
import { textToParagraphs } from '../utils';

import Page from './abstract/Page';

export default class AboutUs extends Page {

  private text = `This is a prototype of an Insurance Management System created as a Software Engineering Project.

ESC-501
Kaustav Doari
13000120049`;

  private textElem = el('div.text', textToParagraphs(this.text));

  constructor() {
    super("About Us", "A Bit of Background");
    mount(this.content, this.textElem);
  }

}
