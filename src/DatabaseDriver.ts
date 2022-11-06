import { PathLike } from 'fs';
import knex, { Knex } from 'knex';

interface Customer {
  _id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

export default class DatabaseDriver {

  knex: Knex;

  constructor(dbPath: PathLike) {
    this.knex = knex({
      client: 'sqlite3',
      connection: {
        filename: dbPath.toString()
      },
      useNullAsDefault: true
    });
  }

  getCustomers() {
    return this.knex<Customer>('customers')
      .select('*')
  }

  getCustomer(username: string) {
    return this.knex<Customer>('customers')
      .select('*')
      .where('username', username)
      .first()
  }
}
