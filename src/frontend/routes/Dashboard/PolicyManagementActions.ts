import { el } from 'redom';

import { Icon } from '../../components';

export default class PolicyManagementActions {
  protected deleteButton = el('a.policy-delete', new Icon('file-document-remove'));
  
  el = el('div.management-buttons', this.deleteButton);

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
