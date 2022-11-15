import { el, RedomComponent } from 'redom';
import { easyAlert } from '../../utils';

import { range } from 'lodash';
import { AgentManagementEditorSubmitParams } from '../../constants';

export default class AgentEditor implements RedomComponent {

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
    areaCode: el('select.pure-input-1',
      { name: 'area-code' },
      range(1, 10 + 1)
        .map(n => el('option', { value: n }, String(n)))
    ) as HTMLSelectElement
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
      el('label', {for: 'area-code'}, "Area Code"),
      this.inputs.areaCode,
      this.submitButton)) as HTMLFormElement;

  constructor() {
    this.submitButton.addEventListener('click', event => {
      event.preventDefault();
      if(!this.validate()) return;
      this.submitHandler({
        name: this.inputs.name.value,
        email: this.inputs.email.value,
        phone: this.inputs.phone.value,
        areaCode: parseInt(this.inputs.areaCode.value)
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

  setValues(name: string, email: string, phone: string, areaCode: number) {
    this.inputs.name.value = name;
    this.inputs.email.value = email;
    this.inputs.phone.value = phone;
    this.inputs.areaCode.value = String(areaCode);
  }

  private submitHandler(_params: AgentManagementEditorSubmitParams) {}
  onSubmit(handler: (params: AgentManagementEditorSubmitParams) => void) {
    this.submitHandler = handler;
  }
}
