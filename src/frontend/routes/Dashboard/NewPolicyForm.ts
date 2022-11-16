import { el, RedomComponent } from 'redom';

export default class NewPolicyForm implements RedomComponent {

  private inputs = {
    policyCode: el('input.pure-input-1', {
        type: 'text',
        name: 'policy-code',
        required: true,
        placeholder: "Policy Code",
    }) as HTMLInputElement,
    policyName: el('input.pure-input-1', {
        type: 'text',
        name: 'policy-name',
        required: true,
        placeholder: "Policy Name",
    }) as HTMLInputElement,
    policyDescription: el('textarea', {
        name: 'policy-description',
        required: true,
        placeholder: "Policy Description",
    }) as HTMLTextAreaElement
  };

  private submitButton = el('button.btn-submit.btn-login.pure-button', "Add");

  el = el('form.pure-form.pure-form-stacked.kdi-form.form-login',
    el('fieldset',
      el('label', {for: 'policy-code'}, "Policy Code"),
      this.inputs.policyCode,
      el('label', {for: 'policy-name'}, "Policy Name"),
      this.inputs.policyName,
      el('label', {for: 'policy-description'}, "Policy Description"),
      this.inputs.policyDescription,
      this.submitButton)) as HTMLFormElement;

  constructor() {
    this.submitButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.submitHandler();
    });
  }

  submitHandler() {}

  onSubmit(handler: () => void) {
    this.submitHandler = handler;
  }

}
