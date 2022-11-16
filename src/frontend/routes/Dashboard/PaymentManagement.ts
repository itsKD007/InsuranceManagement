import { difference, sum } from 'lodash';
import { el, mount, RedomComponent } from 'redom';

import { productTitles, ProductName, productNames, productCosts } from '../../constants';
import { easyAlert } from '../../utils';

export default class PaymentManagement implements RedomComponent {

  private checkboxes: { [key in ProductName]: HTMLInputElement } = {
    home: el('input', {
      type: 'checkbox',
      name: 'home'
    }),
    health: el('input', {
      type: 'checkbox',
      name: 'health'
    }),
    life: el('input', {
      type: 'checkbox',
      name: 'life'
    }),
    travel: el('input', {
      type: 'checkbox',
      name: 'travel'
    }),
    twoWheeler: el('input', {
      type: 'checkbox',
      name: 'two-wheeler'
    }),
    fourWheeler: el('input', {
      type: 'checkbox',
      name: 'four-wheeler'
    })
  };

  private submitButton = el('button.btn-submit.pure-button', "Pay");

  private fieldset = el('fieldset');

  el = el('form.kdi-form.form-payment-management', this.fieldset)

  constructor() {
    this.submitButton.addEventListener('click', event => {
      event.preventDefault();
      if(!this.validate()) return;
      this.submitHandler(
        productNames.filter(policy =>
          this.checkboxes[policy].checked)
      );
    });
    Object.values(this.checkboxes).forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const cost = sum(
          productNames
            .filter(policy => this.checkboxes[policy].checked)
            .map(policy => productCosts[policy])
        );
        if(cost == 0)
          this.submitButton.textContent = `Pay`;
        else
          this.submitButton.textContent = `Pay ₹${cost}`;
      });
    });
  }

  async init(username: string): Promise<ProductName[]> {
    const res = await fetch(
      '/api/policies?'
      + new URLSearchParams({ username }).toString()
    );
    const policiesAlreadyTaken: ProductName[] = await res.json();
    const availablePolicies = difference(productNames, policiesAlreadyTaken);
    if(availablePolicies.length > 0) {
      availablePolicies.forEach(policy => {
        mount(this.fieldset,
          el('label', { for: policy }, 
            this.checkboxes[policy],
            el('span', productTitles[policy])),
        );
      });
      mount(this.fieldset, this.submitButton);
      mount(this, this.fieldset);
    }
    return availablePolicies;
  }

  private validate() {
    const atLeastOneSelected =  Object.values(this.checkboxes)
      .findIndex(checkbox => checkbox.checked) != -1;

    if(!atLeastOneSelected) {
      easyAlert(
        'error',
        "Error",
        "You must select at least one policy!"
      );
      return false;
    }

    return true;

  }

  private submitHandler(_selectedPolicies: ProductName[]) {}
  onSubmit(handler: (selectedPolicies: ProductName[]) => void) {
    this.submitHandler = handler;
  }
}

