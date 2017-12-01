import * as bcrypt from 'bcrypt';
import { Promise } from 'es6-promise';

export default class CryptoService {
  public hashPassword(plaintext: string, callback: (err: Error, encrypted: string) => void) {
    bcrypt.hash(plaintext, 10, callback);
  }

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
}
