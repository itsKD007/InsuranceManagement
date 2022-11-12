import express, { Response } from 'express';
import path from 'path';

import {
  PORT, DB_PATH,
  LoginRequest,
  RegisterRequest,
  LoginErrorMessage,
  LoginResponseBody,
  RegisterResponseBody,
  RegisterErrorMessage,
  UserType
} from './constants';
import DatabaseDriver from './DatabaseDriver';
 
export default class App {
  private server = express();
  private database = new DatabaseDriver(DB_PATH);

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
          const customer = await this.database.getCustomer(req.body.username);
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
          const agent = await this.database.getAgent(req.body.username);
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
          const admin = await this.database.getCustomer(req.body.username);
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
          const customer = await this.database.addCustomer(req.body);
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
          const agent = await this.database.addAgent(req.body);
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

