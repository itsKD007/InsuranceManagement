import { PathLike } from 'fs';
import knex, { Knex } from 'knex';

import { Customer, Agent, RegisterRequestBody } from './constants';

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

  async addCustomer(body: RegisterRequestBody): Promise<Customer | null> {
    const customer = await this.getCustomer(body.username);
    if(customer != null) return null;
    await this.knex<Customer>('customers')
      .insert({
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
        phone: body.phone
      });
    return this.getCustomer(body.username);
  }

  async addAgent(body: RegisterRequestBody): Promise<Agent | null> {
    const agent = await this.getAgent(body.username);
    if(agent != null) return null;
    await this.knex<Agent>('agents')
      .insert({
        username: body.username,
        password: body.password,
        name: body.name,
        email: body.email,
        phone: body.phone,
        areaCode: Math.floor(Math.random() * 10)
      });
    return this.getAgent(body.username);
  }

  getCustomers(): Promise<Customer[]> {
    return this.knex<Customer>('customers')
      .select('*');
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

  async getAgent(username: string): Promise<Agent | null> {
    const agent = await this.knex<Agent>('agents')
      .select('*')
      .where('username', username)
      .first();

    if(typeof agent == 'undefined')
      return null;

    return agent;
  }

  getAgents(): Promise<Agent[]> {
    return this.knex<Agent>('agents')
      .select('*');
  }

}
