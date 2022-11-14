import express, { Request, Response } from 'express';
import path from 'path';

import {
  PORT, USER_DB_PATH, POLICY_DB_PATH,
  LoginRequest,
  RegisterRequest,
  LoginErrorMessage,
  LoginResponseBody,
  RegisterResponseBody,
  RegisterErrorMessage,
  UserType,
  DeleteRequest,
  DeleteResponseBody,
  GetPoliciesRequest,
  ProductName
} from './constants';
import UserDatabaseDriver from './UserDatabaseDriver';
import PolicyDatabaseDriver from './PolicyDatabaseDriver';
import { isEmpty } from 'lodash';
 
export default class App {
  private server = express();
  private usersDb = new UserDatabaseDriver(USER_DB_PATH);
  private policiesDb = new PolicyDatabaseDriver(POLICY_DB_PATH);

  constructor() {
    this.setupHandlers();
  }

  private setupHandlers() {

    this.server.use(express.static(path.join(__dirname, "frontend")));
    this.server.use(express.json());

    this.server.post('/api/login', async (req: LoginRequest, res: Response) => {
      const responseBody: LoginResponseBody = {
        success: false,
        user: null,
        error: null
      };
      switch(req.body.type) {
        case UserType.CUSTOMER:
          const customer = await this.usersDb.getCustomer(req.body.username);
          if(customer == null) {
            responseBody.error = LoginErrorMessage.NOT_FOUND;
            break;
          }
          if(customer.password != req.body.password) {
            responseBody.error = LoginErrorMessage.WRONG_PASSWORD;
            break;
          }
          responseBody.success = true;
          responseBody.user = {
            name: customer.name,
            username: customer.username,
            email: customer.email,
            phone: customer.phone,
            type: UserType.CUSTOMER
          }
          break;
        case UserType.AGENT:
          const agent = await this.usersDb.getAgent(req.body.username);
          if(agent == null) {
            responseBody.error = LoginErrorMessage.NOT_FOUND;
            break;
          }
          if(agent.password != req.body.password) {
            responseBody.error = LoginErrorMessage.WRONG_PASSWORD;
            break;
          }
          responseBody.success = true;
          responseBody.user = {
            name: agent.name,
            username: agent.username,
            email: agent.email,
            phone: agent.phone,
            type: UserType.AGENT
          }
          break;
        case UserType.ADMIN:
          const admin = await this.usersDb.getAdmin(req.body.username);
          if(admin == null) {
            responseBody.error = LoginErrorMessage.NOT_FOUND;
            break;
          }
          if(admin.password != req.body.password) {
            responseBody.error = LoginErrorMessage.WRONG_PASSWORD;
            break;
          }
          responseBody.success = true;
          responseBody.user = {
            name: admin.name,
            username: admin.username,
            email: admin.email,
            phone: admin.phone,
            type: UserType.ADMIN
          }
          break;
        default:
          break;
      }

      res.send(responseBody);

    });

    this.server.post('/api/register', async (req: RegisterRequest, res: Response) => {
      const responseBody: RegisterResponseBody = {
        success: false,
        user: null,
        error: null
      };

      switch(req.body.type) {
        case UserType.CUSTOMER:
          const customer = await this.usersDb.addCustomer(req.body);
          if(customer == null) {
            responseBody.error = RegisterErrorMessage.ALREADY_EXISTS;
          } else {
            responseBody.success = true;
            responseBody.user = {
              name: customer.name,
              username: customer.username,
              email: customer.email,
              phone: customer.phone,
              type: UserType.CUSTOMER
            }
          }
          break;
        case UserType.AGENT:
          const agent = await this.usersDb.addAgent(req.body);
          if(agent == null) {
            responseBody.error = RegisterErrorMessage.ALREADY_EXISTS;
          } else {
            responseBody.success = true;
            responseBody.user = {
              name: agent.name,
              username: agent.username,
              email: agent.email,
              phone: agent.phone,
              type: UserType.AGENT
            }
          }
          break;
        default:
          break;
      }
      res.send(responseBody);

    });

    this.server.get('/api/customers', async (_req: Request, res: Response) => {
      const customers = await this.usersDb.getCustomers();
      res.send(customers.map(customer => ({
        customerId: customer.customerId,
        username: customer.username,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        type: UserType.CUSTOMER
      })));
    });

    this.server.get('/api/agents', async (_req: Request, res: Response) => {
      const agents = await this.usersDb.getAgents();
      res.send(agents.map(agent => ({
        agentId: agent.agentId,
        username: agent.username,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        areaCode: agent.areaCode,
        type: UserType.AGENT
      })));
    });

    this.server.post('/api/delete', async (req: DeleteRequest, res: Response) => {
      const responseBody: DeleteResponseBody = {
        success: false
      };
      switch(req.body.type) {
        case UserType.CUSTOMER:
          responseBody.success = await this.usersDb.deleteCustomer(req.body.username);
          break;
        case UserType.AGENT:
          responseBody.success = await this.usersDb.deleteAgent(req.body.username);
          break;
        default:
          break;
      }
      res.send(responseBody);
    });

    this.server.get('/api/policies', async (req: GetPoliciesRequest, res: Response) => {
      let response: ProductName[] = [];
      if(!isEmpty(req.query.username)) {
        const policies = await this.policiesDb.getPoliciesForCustomer(req.query.username);
        response = policies.map(policy => policy.productName);
      }
      res.send(response);
    });
  }

  run() {
    return new Promise<void>((resolve, reject) => {
      this.server.listen(PORT, () => {
        resolve();
      }).on('error', (err: Error) => {
        reject(err);
      });
    });
  }
}

