import express, { Request, Response } from 'express';
import path from 'path';

import { UserType, PORT, DB_PATH, LoginError } from './constants';
import DatabaseDriver from './DatabaseDriver';

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
    type: UserType;
  }
}

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
      let errorMessage = null;
      switch(req.body.type) {
        case 'customer':
          const customer = await this.database.getCustomer(req.body.username);
          if(typeof customer == 'undefined') {
            errorMessage = LoginError.NOT_FOUND;
            break;
          }
          if(customer.password != req.body.password) {
            errorMessage = LoginError.WRONG_PASSWORD;
            break;
          }
          res.send({
            success: true,
            user: {
              username: customer.username,
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              type: 'customer'
            },
            error: null
          });
          return;
        default:
          break;
      }

      res.send({
        success: false,
        user: null,
        error: errorMessage
      });
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

