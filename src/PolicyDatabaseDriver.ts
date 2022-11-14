import DatabaseDriver from './DatabaseDriver';
import { ProductName, Policy } from './constants';

export default class PolicyDatabaseDriver extends DatabaseDriver {

  addPolicy(username: string, productName: ProductName) {
    return this.knex<Policy>('policies')
      .insert({ username, productName });
  }

  removePolicy(username: string, productName: ProductName) {
    return this.knex<Policy>('policies')
      .delete()
      .where('username', username)
      .andWhere('productName', productName);
  }

  getPoliciesForCustomer(username: string): Promise<Policy[]> {
    return this.knex<Policy>('policies')
      .select('*')
      .where('username', username);
  }

}
