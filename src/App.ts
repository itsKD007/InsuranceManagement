import express, { Response } from 'express';
import path from 'path';

import { PORT, DB_PATH, LoginRequest, LoginErrorMessage, LoginResponseBody, UserType} from './constants';
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
        case 'customer':
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
          return;
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

