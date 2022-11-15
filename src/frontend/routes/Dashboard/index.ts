import { el, setChildren } from 'redom';

import LoginRequisitePage from '../abstract/LoginRequisitePage';
import { Tile } from '../../components';
import { AppState } from '../../App';
import { TilesContainer } from '../../components/Tile';
import {
  AdminDashboardTileName,
  AgentDashboardTileName,
  CustomerDashboardTileName,
  productCosts,
  UserType,
  UserUpdateResponseBody,
} from '../../constants';
import { easyAlert } from '../../utils';

import AgentManagement from './AgentManagement';
import AgentEditor from './AgentEditor';
import CustomerManagement from './CustomerManagement';
import CustomerEditor from './CustomerEditor';
import PolicyViewer from './PolicyViewer';
import PaymentManagement from './PaymentManagement';
import { sum } from 'lodash';

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

  setupCustomerDashboard(appState: AppState) {
    this.tilesContainer.setTiles(
      Object.values(this.tiles.customer)
    );
    Object.keys(this.tiles.customer).forEach((tileName: CustomerDashboardTileName) => {
      this.tiles.customer[tileName].onClick(async () => {
        if(!appState.isLoggedIn || appState.user == null)
          return;

        switch(tileName) {
          case 'viewPolicies':
            this.heading = 'View Policies';
            this.subheading = 'Check Your Active Plans';
            await this.animateHide();
            const policyViewer = new PolicyViewer()
            await policyViewer.init(appState.user.username);
            setChildren(this.content, [policyViewer]);
            await this.animateShow();
            break;

          case 'managePayments':
            this.heading = 'Manage Payments';
            this.subheading = 'Pay For Your Policies';
            await this.animateHide();
            const paymentManagement = new PaymentManagement()
            paymentManagement.onSubmit(async selectedPolicies => {
              if(!appState.isLoggedIn || appState.user == null)
                return;
              await fetch('/api/addpolicy', {
                method: 'post',
                body: JSON.stringify({
                  username: appState.user.username,
                  policyNames: selectedPolicies
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              await this.animateHide();
              easyAlert(
                'success',
                "Payment Complete",
                `Successfully paid ₹${sum(selectedPolicies.map(policy => productCosts[policy]))}`
              );
              
              this.update(appState);
              await this.animateShow();
            });
            await paymentManagement.init(appState.user.username);
            setChildren(this.content, [paymentManagement]);
            await this.animateShow();
            break;
        }
      });
    });
  }

  setupAgentDashboard(appState: AppState) {
    this.tilesContainer.setTiles(
      Object.values(this.tiles.agent)
    );
    Object.keys(this.tiles.agent).forEach((tileName: AgentDashboardTileName) => {
      this.tiles.agent[tileName].onClick(async () => {
        switch(tileName) {
          case 'manageCustomers':
            this.heading = 'Manage Customers';
            this.subheading = 'Modify or Close Accounts'
            const customerManagement = new CustomerManagement();
            const customerEditor = new CustomerEditor();
            customerManagement.onEditClick(editParams => {
              customerEditor.onSubmit(async submitParams => {
                const res = await fetch('/api/update', {
                  method: 'post',
                  body: JSON.stringify({
                    username: editParams.username,
                    name: submitParams.name,
                    email: submitParams.email,
                    phone: submitParams.phone,
                    type: UserType.CUSTOMER
                  }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                const data: UserUpdateResponseBody = await res.json();
                if(!data.success) {
                  easyAlert('error', "Error", "We had some trouble updating this customer's data.");
                  return;
                }
                animateUpdateAndShow('viewer');
              });
              customerEditor.setValues(
                editParams.name,
                editParams.email,
                editParams.phone
              );
              animateUpdateAndShow('editor');
            });
            const animateUpdateAndShow = async (view: 'viewer' | 'editor') => {
              if(!appState.isLoggedIn || appState.user == null)
                return;
              switch(view) {
                case 'viewer':
                  await this.animateHide();
                  await customerManagement.init();
                  setChildren(this.content, [customerManagement]);
                  await this.animateShow();
                  break;
                case 'editor':
                  await this.animateHide();
                  setChildren(this.content, [customerEditor]);
                  await this.animateShow();
                  break;

              }
            }
            customerManagement.onUpdate(async () => {
              await animateUpdateAndShow('viewer');
            });
            await animateUpdateAndShow('viewer');
            break;
        }
      });
      });
  }

  setupAdminDashboard(appState: AppState) {
    this.tilesContainer.setTiles(
      Object.values(this.tiles.admin)
    );
    Object.keys(this.tiles.admin).forEach((tileName: AdminDashboardTileName) => {
      this.tiles.admin[tileName].onClick(async () => {
        switch(tileName) {
          case 'manageAgents':
            this.heading = 'Manage Agents';
            this.subheading = 'Modify or Close Accounts'
            const agentManagement = new AgentManagement();
            const agentEditor = new AgentEditor();
            agentManagement.onEditClick(editParams => {
              agentEditor.onSubmit(async submitParams => {
                const res = await fetch('/api/update', {
                  method: 'post',
                  body: JSON.stringify({
                      username: editParams.username,
                      name: submitParams.name,
                      email: submitParams.email,
                      phone: submitParams.phone,
                      areaCode: submitParams.areaCode,
                      type: UserType.AGENT
                    }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                const data: UserUpdateResponseBody = await res.json();
                if(!data.success) {
                  easyAlert('error', "Error", "We had some trouble updating this agent's data.");
                  return;
                }
                animateUpdateAndShow('viewer');
              });
              agentEditor.setValues(
                editParams.name,
                editParams.email,
                editParams.phone,
                editParams.areaCode
              );
              animateUpdateAndShow('editor');
            });
            const animateUpdateAndShow = async (view: 'viewer' | 'editor') => {
              if(!appState.isLoggedIn || appState.user == null)
                return;
              switch(view) {
                case 'viewer':
                  await this.animateHide();
                  await agentManagement.init();
                  setChildren(this.content, [agentManagement]);
                  await this.animateShow();
                  break;
                case 'editor':
                  await this.animateHide();
                  setChildren(this.content, [agentEditor]);
                  await this.animateShow();
                  break;

              }
            }
            agentManagement.onUpdate(async () => {
              await animateUpdateAndShow('viewer');
            });
            await animateUpdateAndShow('viewer');
            break;
        }
      });
    });
  }

  update(appState: AppState) {
    super.update(appState);
    if(!appState.isLoggedIn || appState.user == null)
      return;
    switch(appState.user.type) {
      case 'customer':
        this.setupCustomerDashboard(appState);
        break;
      case 'agent':
        this.setupAgentDashboard(appState);
        break;
      case 'admin':
        this.setupAdminDashboard(appState);
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
