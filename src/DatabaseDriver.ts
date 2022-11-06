import { PathLike } from 'fs';
import knex from 'knex';

interface Customer {
  _id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

export default class DatabaseDriver {
  constructor(dbPath: PathLike) {
    knex({
      client: 'sqlite3',
      connection: {
        filename: dbPath.toString()
      },
      useNullAsDefault: true
    });
    console.log(dbPath);
  }

  async getCustomers() {
    return await knex<Customer>('customers')
      .select('*').from('customers')
  }

  async getCustomer(username: string) {
    return await knex<Customer>('customers')
      .select('*')
      .from('customers')
      .where('username', username)
      .first()
  }
}
