import Database from './database';
import { AppUser } from '../model/app_user';
import { INSERT_USER, USERS_LIMIT } from './queries/app_user_queries';
import * as pg from 'pg';

/**
 * The UserService is responsible for saving, updating and retrieving
 * instances of the AppUser model.
 */
class UserService {
  private db: Database;

  constructor() {
    this.db = Database.instance();
  }

  public getUsers(limit = 10, offset = 0): Promise<AppUser[]> {
    return this.db.query(USERS_LIMIT, [limit, offset])
      .then((results: pg.QueryResult) => {
        return results.rows as AppUser[];
      });
  }

  public createUser(user: AppUser): Promise<AppUser> {
    return this.db.query(INSERT_USER, [user.username, user.password, user.first_name, user.last_name])
      .then((result: pg.QueryResult) => {
        user.id = result.rows[0].id;

        return user;
      });
  }
}

export default UserService;
