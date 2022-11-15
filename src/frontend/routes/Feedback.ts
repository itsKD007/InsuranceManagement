import { el, mount } from 'redom';
import { easyAlert } from '../utils';

import Page from './abstract/Page';

export default class Feedback extends Page {

  private submitButton = el('button.btn-submit.pure-button', "Send");
  private textarea = el('textarea');
  private form = el('form.pure-form.kdi-form.form-feedback',
    el('fieldset',
      this.textarea,
      this.submitButton));

  constructor() {
    super("Feedback", "Share Your Thoughts");
    this.submitButton.addEventListener('click', event => {
      event.preventDefault();
      easyAlert(
        'success',
        "Feedback Recorded",
        "We have received your feedback. Thank you!"
      );
      this.textarea.value = '';
    });
    mount(this.content, this.form);
  }

}
