import { el, mount } from 'redom';
import { textToParagraphs } from '../utils';

import Page from './abstract/Page';

export default class AboutUs extends Page {

  private text = `We at KD Insurance Pvt. Ltd. wish you a very warm welcome. We are a small but reliable insurance company dedicated to serving you better every moment.

The application you're using now is a product of consistent efforts, attention to detail and proper utilization of the latest technologies and the best practices in software development of this day and age.

We take pride in our stringent, unparalleled security and privacy practices. Our users can feel safe with us, knowing their data is protected with state-of-the-art techniques.

Thank you for choosing us!

---

This application was built as a software engineering project for the ESC-501 course, with the topic being a web-based "insurance management system". What started out small has since grown into a comprehensive, efficient and functional system, and all of the ideas in our software requirements specifications (SRS) document have come to fruition.

Kaustav Doari
13000120049`;

  private textElem = el('div.text', textToParagraphs(this.text));

  constructor() {
    super("About Us", "A Bit of Background");
    mount(this.content, this.textElem);
  }

}
