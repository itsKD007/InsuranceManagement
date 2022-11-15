import { Agent, AgentManagementEditorEditParams } from '../../constants';
import UserManagementActions from './UserManagementActions';

export default class AgentManagementActions extends UserManagementActions {
  constructor(agent: Agent) {
    super();
    this.editButton.addEventListener('click', () => {
      this.editClickHandler({
        username: agent.username,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        areaCode: agent.areaCode
      });
    });
  }
  private editClickHandler(_params: AgentManagementEditorEditParams) {}
  onEditClick(handler: (params: AgentManagementEditorEditParams) => void) {
    this.editClickHandler = handler;
  }
}
