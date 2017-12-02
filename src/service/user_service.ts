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
   * @param {boolean} sanitize - Remove private user fields?
   * @return {Promise<AppUser | null>}
   */
  public getUserById(id: number, sanitize = true): Promise<AppUser | null> {
    return this.db.query(USER_BY_ID, [id])
      .then((results: QueryResult) => {
        if (results.rowCount === 0) {
          return null;
        }

        return (sanitize ? UserService.sanitize(results.rows[0]) : results.rows[0]);
      })
  }

  /**
   * Returns the roles array for a given user
   * @param {number} id
   * @return {Promise<string[]>}
   */
  public getRoles(id: number): Promise<string[]> {
    return this.db.query(ROLES_BY_USER_ID, [id])
      .then((roles: QueryResult) => {
        return roles.rows.map(row => row.role);
      });
  }

  /**
   * Retrieve a user by their username
   * @param {string} username
   * @param {boolean} sanitize - Remove private user fields?
   * @return {Promise<AppUser | null>}
   */
  public getUserByUsername(username: string, sanitize = true): Promise<AppUser | null> {
    return this.db.query(USER_BY_USERNAME, [username])
      .then((results: QueryResult) => {
        if (results.rowCount === 0) {
          return null;
        }

        return (sanitize ? UserService.sanitize(results.rows[0]) : results.rows[0]);
      })
  }

  /**
   * Get all of {@limit} users sorted by ID and offset by {@offset}
   * @param {number} limit
   * @param {number} offset
   * @param {boolean} sanitize - Remove private user fields?
   * @return {Promise<AppUser[]>}
   */
  public getUsers(limit = 10, offset = 0, sanitize = true): Promise<AppUser[]> {
    return this.db.query(USERS_LIMIT, [limit, offset])
      .then((results: pg.QueryResult) => {
        return results.rows.map(user =>
          (sanitize ? UserService.sanitize(user) : user));
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

  /**
   * Returns a publicly safe user instance with private fields removed
   * @param {AppUser} user
   */
  private static sanitize(user: AppUser): AppUser {
    const sanitizedUser = user;

    delete sanitizedUser.password;
    delete sanitizedUser.activated;
    delete sanitizedUser.first_login;

    return sanitizedUser;
  }
}

export default UserService;
