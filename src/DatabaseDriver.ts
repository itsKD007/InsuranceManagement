import { PathLike } from 'fs';
import knex, { Knex } from 'knex';

export default abstract class DatabaseDriver {

  protected knex: Knex;

  constructor(dbPath: PathLike) {
    this.knex = knex({
      client: 'sqlite3',
      connection: {
        filename: dbPath.toString()
      },
      useNullAsDefault: true
    });
  }
}
