import { remove } from 'lodash';
import { el, mount, RedomComponent, setChildren } from 'redom';

import {
  productTitles,
  ProductName,
  productNames,
} from '../../constants';
import { easyAlert } from '../../utils';

import PolicyManagementActions from './PolicyManagementActions';

export class NewPolicyLink implements RedomComponent {
  private a = el(
    'a.new-policy-link',
    { href: '#' },
    "Add New Policy"
  );
  el = el('div.link-container.new-policy-link-container', this.a);
  constructor() {
    this.a.addEventListener('click', () => {
      this.clickHandler();
    });
  }
  set text(text: string) {
    this.a.textContent = text;
  }
  clickHandler() { }
  onClick(handler: () => void) {
    this.clickHandler = handler;
  }
}

export default class PolicyManagement implements RedomComponent {

  private policies: ProductName[] = Object.values(productNames);

  private thead = el('thead.kdi-thead', [
    'Sl. No.',
    'Policy Code',
    'Policy Name',
    'Actions'
  ].map(text => el('th', text)));
  private tbody = el('tbody.kdi-tbody');
  private table = el('table.pure-table.pure-table-bordered', this.thead, this.tbody);

  el = el('div.table-container', this.table);

  init(): ProductName[] {
    setChildren(this.tbody, []);
    if(this.policies.length == 0) {
      this.noPoliciesFoundHandler();
    } else {
      this.mountRows();
    }
    return this.policies;
  }

  private mountRows() {
    this.policies.forEach((policyName, i) => {
      const managementActions = new PolicyManagementActions();
      managementActions.onDeleteClick(async () => {
        remove(this.policies, policy => policy == policyName);
        easyAlert(
          'success',
          "Request Submitted",
          `Your request for removal of ${productTitles[policyName]} has been successfully submitted. It is currently in queue and will be reviewed shortly.`
        );
        this.init();
      });
      mount(this.tbody, el('tr', [
        el('td', String(i + 1)),
        el('td', policyName),
        el('td', productTitles[policyName]),
        el('td', managementActions)
      ]));
    });
  }

  private noPoliciesFoundHandler() {}
  onNoPoliciesFound(handler: () => void) {
    this.noPoliciesFoundHandler = handler;
  }
}
