import { el, mount, RedomComponent, setChildren } from 'redom';
import { easyAlert } from '../../utils';
import {
  Agent,
  AgentManagementEditorEditParams,
  UserDeleteResponseBody,
  UserType
} from '../../constants';

import AgentManagementActions from './AgentManagementActions';

export default class AgentManagement implements RedomComponent {
  private thead = el('thead.kdi-thead', [
    'ID',
    'Username',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Area Code',
    'Actions'
  ].map(text => el('th', text)));
  private tbody = el('tbody.kdi-tbody');
  private table = el('table.pure-table.pure-table-bordered', this.thead, this.tbody);

  el = el('div.table-container', this.table);
  async init() {
    const res = await fetch('/api/agents')
    const agents: Agent[] = await res.json();
    setChildren(this.tbody, []);
    agents.forEach(agent => {
      const managementActions = new AgentManagementActions(agent);
      managementActions.onEditClick((params: AgentManagementEditorEditParams) => {
        this.editClickHandler(params);
      });
      managementActions.onDeleteClick(async () => {
        const res = await fetch('/api/delete', {
          method: 'post',
          body: JSON.stringify({
            username: agent.username,
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
        el('td', agent.agentId),
        el('td', agent.username),
        el('td', agent.name),
        el('td', agent.email),
        el('td', agent.phone),
        el('td', agent.areaCode),
        el('td', managementActions)
      ]));
    });
  }
  private updateHandler() {}
  async onUpdate(handler: () => void) {
    this.updateHandler = handler;
  }

  private editClickHandler(_params: AgentManagementEditorEditParams) {}
  async onEditClick(handler: (params: AgentManagementEditorEditParams) => void) {
    this.editClickHandler = handler;
  }
}
