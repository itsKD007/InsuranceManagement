import { PathLike } from 'fs';
import knex, { Knex } from 'knex';

import { Customer } from './constants';

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

  async getCustomer(username: string): Promise<Customer | null> {
    const customer = await this.knex<Customer>('customers')
      .select('*')
      .where('username', username)
      .first();

    if(typeof customer == 'undefined')
      return null;

    return customer;
  }
}
