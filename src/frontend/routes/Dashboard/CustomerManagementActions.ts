import { Customer, CustomerManagementEditorEditParams } from '../../constants';
import UserManagementActions from './UserManagementActions';

export default class CustomerManagementActions extends UserManagementActions {
  constructor(customer: Customer) {
    super();
    this.editButton.addEventListener('click', () => {
      this.editClickHandler({
        username: customer.username,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      });
    });
  }
  private editClickHandler(_params: CustomerManagementEditorEditParams) {}
  onEditClick(handler: (params: CustomerManagementEditorEditParams) => void) {
    this.editClickHandler = handler;
  }
}
