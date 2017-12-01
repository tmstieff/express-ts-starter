import Database from './database';
import { AppUser } from '../model/app_user';
import { INSERT_USER, ROLES_BY_USER_ID, USER_BY_ID, USER_BY_USERNAME, USERS_LIMIT } from './queries/app_user_queries';
import * as pg from 'pg';
import { QueryResult } from 'pg';

/**
 * The UserService is responsible for saving, updating and retrieving
 * instances of the AppUser model.
 */
class UserService {
  private db: Database;

  constructor() {
    this.db = Database.instance();
  }

  /**
   * Retrieve a user by there user ID
   * @param {number} id
   * @return {Promise<AppUser | null>}
   */
  public getUserById(id: number): Promise<AppUser | null> {
    return this.db.query(USER_BY_ID, [id])
      .then((results: QueryResult) => {
        if (results.rowCount === 0) {
          return null;
        }

        return results.rows[0] as AppUser;
      })
  }

  public getRoles(id: number): Promise<string[]> {
    return this.db.query(ROLES_BY_USER_ID, [id])
      .then((roles: QueryResult) => {
        return roles.rows.map(row => row.role);
      });
  }

  /**
   * Retrieve a user by their username
   * @param {string} username
   * @return {Promise<AppUser | null>}
   */
  public getUserByUsername(username: string): Promise<AppUser | null> {
    return this.db.query(USER_BY_USERNAME, [username])
      .then((results: QueryResult) => {
        if (results.rowCount === 0) {
          return null;
        }

        return results.rows[0] as AppUser;
      })
  }

  /**
   * Get all of {@limit} users sorted by ID and offset by {@offset}
   * @param {number} limit
   * @param {number} offset
   * @return {Promise<AppUser[]>}
   */
  public getUsers(limit = 10, offset = 0): Promise<AppUser[]> {
    return this.db.query(USERS_LIMIT, [limit, offset])
      .then((results: pg.QueryResult) => {
        return results.rows as AppUser[];
      });
  }

  /**
   * Create a new AppUser. The password will be inserted as-is, so hash it beforehand.
   * @param {AppUser} user
   * @return {Promise<AppUser>}
   */
  public createUser(user: AppUser): Promise<AppUser> {
    return this.db.query(INSERT_USER, [user.username, user.password, user.first_name, user.last_name])
      .then((result: pg.QueryResult) => {
        user.id = result.rows[0].id;
        delete user.password;

        return user;
      });
  }
}

export default UserService;
