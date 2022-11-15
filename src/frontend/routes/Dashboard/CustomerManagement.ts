import { el, mount, setChildren, RedomComponent } from 'redom';
import { easyAlert } from '../../utils';

import {
  Customer,
  CustomerManagementEditorEditParams,
  UserDeleteResponseBody,
  UserType,
} from '../../constants';

import CustomerManagementActions from './CustomerManagementActions';

export default class CustomerManagement implements RedomComponent {
  private thead = el('thead.kdi-thead', [
    'ID',
    'Username',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Actions'
  ].map(text => el('th', text)));
  private tbody = el('tbody.kdi-tbody');
  private table = el('table.pure-table.pure-table-bordered', this.thead, this.tbody);

  el = el('div.table-container', this.table);
  async init() {
    const res = await fetch('/api/customers')
    const customers: Customer[] = await res.json();
    setChildren(this.tbody, []);
    customers.forEach(customer => {
      const managementActions = new CustomerManagementActions(customer);
      managementActions.onEditClick(this.editClickHandler);
      managementActions.onDeleteClick(async () => {
        const res = await fetch('/api/delete', {
          method: 'post',
          body: JSON.stringify({
            username: customer.username,
            type: UserType.CUSTOMER
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: UserDeleteResponseBody = await res.json();
        if(!data.success) {
          easyAlert('error', "Error", "We had some trouble deleting the customer you selected.");
          return;
        }
        easyAlert(
          'success',
          "Success",
          `The customer you selected has been deleted from our records.`
        );
        this.updateHandler();
      });
      mount(this.tbody, el('tr', [
        el('td', customer.customerId),
        el('td', customer.username),
        el('td', customer.name),
        el('td', customer.email),
        el('td', customer.phone),
        el('td', managementActions)
      ]));
    });
  }
  private updateHandler() {}
  async onUpdate(handler: () => void) {
    this.updateHandler = handler;
  }

  private editClickHandler(_params: CustomerManagementEditorEditParams) {}
  onEditClick(handler: (params: CustomerManagementEditorEditParams) => void) {
    this.editClickHandler = handler;
  }
}

