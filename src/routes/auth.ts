import { Request, Response, Router } from 'express';
import ErrorResponse from '../model/rest/error_response';
import { AppUser } from '../model/app_user';
import UserService from '../service/user_service';
import CryptoService from '../service/crypto_service';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import AuthLoginResponse from '../model/rest/auth_login_response';

const userService: UserService = new UserService();
const crypto: CryptoService = new CryptoService();

const setup = (router: Router) => {
  router.get('/auth', (req: Request, res: Response) => {

  });

  router.post('/auth/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid username or password supplied.' } as ErrorResponse);
    }

    let appUser: AppUser;
    userService.getUserByUsername(username.toLowerCase())
      .then((user: AppUser) => {
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password supplied.'} as ErrorResponse);
        }

        appUser = user;

        return crypto.validatePassword(password, user.password);
      })
      .then((areSame: boolean) => {
        if (!areSame) {
          return res.status(401).json({ error: 'Invalid username or password supplied.'} as ErrorResponse);
        }

        delete appUser.password;

        return userService.getRoles(appUser.id);
      })
      .then((roles: string[]) => {
        appUser.roles = roles;

        const userPayload = {
          id: appUser.id,
          username: appUser.username,
          roles: appUser.roles,
          first_name: appUser.first_name,
          last_name: appUser.last_name,
        };

        jwt.sign(userPayload, config.get('jwt.secret'), {}, (error: Error, token: string) => {
          req.headers['Bearer'] = token;

          const response: AuthLoginResponse = {
            token,
            user: appUser,
          };

          return res.status(200).json(response);
        });
      })
      .catch(_ => {
        return res.status(500).json({ error: 'Invalid username or password supplied.'} as ErrorResponse);
      });
  });
};

export default setup;