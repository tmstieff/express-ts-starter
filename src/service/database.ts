import * as pg from 'pg';
import { pgpool } from './pgpool';

class Database {
  private static db: Database;
  private pool: pg.Pool;

  constructor(pool: pg.Pool) {
    this.pool = pool;
  }

  private static initialize(): void {
    this.db = new Database(pgpool.pool);
  }

  public query(sql: string, values?: any[]): Promise<pg.QueryResult> {
    return this.pool.query(sql, values);
  }

  public static instance(): Database {
    if (this.db) {
      return this.db;
    }

    this.initialize();

    return this.db;
  }
}

export default Database;
