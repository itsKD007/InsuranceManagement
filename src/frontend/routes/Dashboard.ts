import { el, mount, RedomComponent, setChildren } from 'redom';

import LoginRequisitePage from './abstract/LoginRequisitePage';
import { Icon, Tile } from '../components';
import { AppState } from '../App';
import { TilesContainer } from '../components/Tile';
import { AdminDashboardTileName, Agent, AgentDashboardTileName, Customer, CustomerDashboardTileName, DeleteResponseBody, UserType } from '../constants';
import { easyAlert } from '../utils';

class ManagementActions {
  private editButton = el('a.user-edit', new Icon('account-edit'));
  private deleteButton = el('a.user-delete', new Icon('account-cancel'));
  
  el = el('div.management-buttons', this.editButton, this.deleteButton);

  constructor() {
    this.editButton.addEventListener('click', () => {
      this.editHandler();
    });
    this.deleteButton.addEventListener('click', async () => {
      this.deleteHandler();
    });
  }
  private editHandler() {}
  onEdit(handler: () => void) {
    this.editHandler = handler;
  }
  private deleteHandler() {}
  onDelete(handler: () => void) {
    this.deleteHandler = handler;
  }
}

class CustomerManagement implements RedomComponent {
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
      const managementActions = new ManagementActions();
      managementActions.onEdit(async () => {
        
      });
      managementActions.onDelete(async () => {
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
        const data: DeleteResponseBody = await res.json();
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

  private editingHandler() {}
  async onEditing(handler: () => void) {
    this.editingHandler = handler;
  }
}

class AgentManagement implements RedomComponent {
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
      const managementActions = new ManagementActions();
      managementActions.onEdit(async () => {
        
      });
      managementActions.onDelete(async () => {
        const res = await fetch('/api/delete', {
          method: 'post',
          body: JSON.stringify({
            username: agent.username,
            type: UserType.AGENT
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: DeleteResponseBody = await res.json();
        if(!data.success) {
          easyAlert('error', "Error", "We had some trouble deleting the agent you selected.");
          return;
        }
        easyAlert(
          'success',
          "Success",
          `The agent you selected has been deleted from our records.`
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

  private editingHandler() {}
  async onEditing(handler: () => void) {
    this.editingHandler = handler;
  }
}


export default class Dashboard extends LoginRequisitePage {

  private greetingElem = el('div.greeting');

  private tiles = {
    customer: {
      viewPolicies: new Tile(
        "eye",
        "View Policies",
        "#d7ddd4"
      ),
      manageAccount: new Tile(
        "account-cog",
        "Manage Account",
        "#ddd6d4"
      ),
      managePayments: new Tile(
        "cash-multiple",
        "Manage Payments",
        "#d4ddd7"
      )
    },
    agent: {
      manageAccount: new Tile(
        "account-cog",
        "Manage Account",
        "#dddad4"
      ),
      manageCustomers: new Tile(
        "account-multiple",
        "Manage Customers",
        "#d9d4dd"
      ),
    },
    admin: {
      manageAccount: new Tile(
        "account-cog",
        "Manage Account",
        "#d8ddd4"
      ),
      manageAgents: new Tile(
        "account-tie",
        "Manage Agents",
        "#ddd9d4"
      ),
      managePolicies: new Tile(
        "file-cog",
        "Manage Policies",
        "#d4dddc"
      )
    }
  }

  tilesContainer = new TilesContainer();

  constructor() {
    super("Dashboard", "Manage Your Account")
  }

  update(appState: AppState) {
    super.update(appState);
    if(!appState.isLoggedIn || appState.user == null)
      return;
    switch(appState.user.type) {
      case 'customer':
        this.tilesContainer.setTiles(
          Object.values(this.tiles.customer)
        );
        Object.keys(this.tiles.customer)
          .forEach((tileName: CustomerDashboardTileName) => {
            
          });
        break;
      case 'agent':
        this.tilesContainer.setTiles(
          Object.values(this.tiles.agent)
        );
        Object.keys(this.tiles.agent)
          .forEach((tileName: AgentDashboardTileName) => {
            this.tiles.agent[tileName].onClick(async () => {
              switch(tileName) {
                case 'manageCustomers':
                  this.heading = 'Manage Customers';
                  this.subheading = 'Modify or Close Accounts'
                  const customerManagement = new CustomerManagement();
                  const animateUpdateAndShow = async () => {
                    await this.animateHide();
                    await customerManagement.init();
                    setChildren(this.content, [customerManagement]);
                    await this.animateShow();
                  }
                  customerManagement.onUpdate(animateUpdateAndShow);
                  await animateUpdateAndShow();
                  break;
              }
            });
          });
        break;
      case 'admin':
        this.tilesContainer.setTiles(
          Object.values(this.tiles.admin)
        );
        Object.keys(this.tiles.admin)
          .forEach((tileName: AdminDashboardTileName) => {
            this.tiles.admin[tileName].onClick(async () => {
              switch(tileName) {
                case 'manageAgents':
                  this.heading = 'Manage Agents';
                  this.subheading = 'Modify or Close Accounts'
                  const agentManagement = new AgentManagement();
                  const animateUpdateAndShow = async () => {
                    await this.animateHide();
                    await agentManagement.init();
                    setChildren(this.content, [agentManagement]);
                    await this.animateShow();
                  }
                  agentManagement.onUpdate(animateUpdateAndShow);
                  await animateUpdateAndShow();
                  break;
              }
            });
          });
        break;
    }
    this.heading = 'Dashboard';
    this.subheading = 'Manage Your Account'
    this.greetingElem.textContent = `Welcome, ${appState.user.name}`;
    setChildren(this.content, [
      this.greetingElem,
      this.tilesContainer
    ]);
  }

}

