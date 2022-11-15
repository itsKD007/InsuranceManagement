import { el, mount, setChildren } from 'redom';

import {
  productTitles,
  ProductName,
} from '../../constants';
import { easyAlert } from '../../utils';

import PolicyManagementActions from './PolicyManagementActions';

export default class PolicyViewer {
  private thead = el('thead.kdi-thead', [
    'Sl. No.',
    'Policy Name',
    'Actions'
  ].map(text => el('th', text)));
  private tbody = el('tbody.kdi-tbody');
  private table = el('table.pure-table.pure-table-bordered', this.thead, this.tbody);
  el = el('div.table-container', this.table);
  async init(username: string) {
    const res = await fetch(
      '/api/policies?'
      + new URLSearchParams({ username }).toString()
    );
    const policies: ProductName[] = await res.json();
    setChildren(this.tbody, []);
    policies.forEach((policyName, i) => {
      const managementActions = new PolicyManagementActions();
      managementActions.onDeleteClick(async () => {
        await fetch('/api/removepolicy', {
          method: 'post',
          body: JSON.stringify({
            username,
            policyName
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        easyAlert(
          'success',
          "Policy Removed",
          `Successfully removed ${productTitles[policyName]}`
        );
        this.init(username);
      });
      mount(this.tbody, el('tr', [
        el('td', String(i + 1)),
        el('td', productTitles[policyName]),
        el('td', managementActions)
      ]));
    });
  }
}
