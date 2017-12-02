import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { Promise } from 'es6-promise';
import { NextFunction } from 'express';

/**
 * The CryptoService is responsible for hashing and comparing passwords
 */
export default class CryptoService {
  /**
   * Salts and hashes a plaintext password
   * @param {string} plaintext
   * @param {(err: Error, encrypted: string) => void} callback
   */
  public hashPassword(plaintext: string, callback: (err: Error, encrypted: string) => void) {
    bcrypt.hash(plaintext, 10, callback);
  }

  /**
   * Validates if a plaintext passwords equals a hashed password
   * @param {string} plaintext
   * @param {string} hashed
   * @return {Promise<boolean>}
   */
  public validatePassword(plaintext: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, hashed, (err: Error, same: boolean) => {
        if (err) {
          return reject(err);
        }

        return resolve(same);
      });
    });
  }

  /**
   * Validates if a specified JWT can be decoded correctly using the
   * server's secret key
   * @param {Request} req
   * @param {Response} res
   * @param {e.NextFunction} next
   * @return {Promise<boolean>}
   */
  public static validateJwt(req: Request, res: Response, next: NextFunction): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const token = req.headers['bearer'];
      if (!token) {
        return resolve(false);
      }

      jwt.verify(token, config.get('jwt.secret'), (err, decoded) => {
        if (err || !decoded) {
          return resolve(false);
        }

        req['user'] = decoded;

        return resolve(true);
      });
    });
  }
}

/**
 * Check if the current user has the specified role
 * @param {string} role
 * @return {(req, res, next) => Promise<void>}
 */
export const checkRole = (role: string) => {
  return (req, res, next) => {
    return CryptoService.validateJwt(req, res, next)
      .then((isValid: boolean) => {
        if (isValid) {
          if (req['user'].roles.indexOf(role) >= 0) {
            return next();
          }
        }

        res.status(401);
        return next('Unauthorized access');
      });
  }
};

