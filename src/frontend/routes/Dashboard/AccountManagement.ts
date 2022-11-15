import { el, RedomComponent } from 'redom';
import { easyAlert } from '../../utils';

import { AccountManagementSubmitParams } from '../../constants';

export default class AccountManagement implements RedomComponent {

  private inputs = {
    name: el('input.pure-input-1', {
      type: 'text',
      name: 'name',
      placeholder: 'Full Name'
    }) as HTMLInputElement,
    email: el('input.pure-input-1', {
      type: 'email',
      name: 'email',
      placeholder: 'customer@example.com'
    }) as HTMLInputElement,
    phone: el('input.pure-input-1', {
        type: 'tel',
        name: 'phone',
        placeholder: "Phone Number",
        pattern: "\\d{10}"
    }) as HTMLInputElement,
    password: el('input.pure-input-1', {
        type: 'password',
        name: 'password',
        placeholder: "Password",
    }) as HTMLInputElement

  }
  private submitButton = el('button.btn-submit.pure-button', "Save");
  el = el('form.kdi-form.pure-form.pure-form-stacked',
    el('fieldset',
      el('label', {for: 'name'}, "Full Name"),
      this.inputs.name,
      el('label', {for: 'email'}, "Email Address"),
      this.inputs.email,
      el('label', {for: 'phone'}, "Phone Number"),
      this.inputs.phone,
      el('label', {for: 'password'}, "Password"),
      this.inputs.password,
      this.submitButton)) as HTMLFormElement;

  constructor() {
    this.submitButton.addEventListener('click', event => {
      event.preventDefault();
      if(!this.validate()) return;
      this.submitHandler({
        name: this.inputs.name.value,
        email: this.inputs.email.value,
        phone: this.inputs.phone.value,
        password: this.inputs.password.value
      });
    });
  }

  validate() {
    const inputsValid = Object.values(this.inputs)
      .every(input => input.validity.valid);
    
    if(!inputsValid)
      easyAlert('error', "Error", "Some of the fields have invalid input.");

    return inputsValid;

  }

  setValues(name: string, email: string, phone: string) {
    this.inputs.name.value = name;
    this.inputs.email.value = email;
    this.inputs.phone.value = phone;
  }

  private submitHandler(_params: AccountManagementSubmitParams) {}
  onSubmit(handler: (params: AccountManagementSubmitParams) => void) {
    this.submitHandler = handler;
  }
}
