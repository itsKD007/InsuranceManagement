import { el } from 'redom';

import { Icon } from '../../components';

export default abstract class UserManagementActions {
  protected editButton = el('a.user-edit', new Icon('account-edit'));
  protected deleteButton = el('a.user-delete', new Icon('account-cancel'));
  
  el = el('div.management-buttons', this.editButton, this.deleteButton);

  constructor() {
    this.deleteButton.addEventListener('click', async () => {
      this.deleteClickHandler();
    });
  }
  private deleteClickHandler() {}
  onDeleteClick(handler: () => void) {
    this.deleteClickHandler = handler;
  }
}
