import { Request, Response, Router } from 'express';
import ErrorResponse from '../model/rest/error_response';
import { AppUser } from '../model/app_user';
import UserService from '../service/user_service';
import CryptoService, { checkRole } from '../service/crypto_service';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import AuthLoginResponse from '../model/rest/auth_login_response';

const userService: UserService = new UserService();
const crypto: CryptoService = new CryptoService();

const setup = (router: Router) => {
  router.get('/auth', checkRole('user'), (req: Request, res: Response) => {
    return res.status(200).json(req['user']);
  });

  router.post('/auth/login', (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid username or password supplied.' } as ErrorResponse);
    }

    let appUser: AppUser;
    let responded: boolean = false;
    userService.getUserByUsername(username.toLowerCase())
      .then((user: AppUser) => {
        if (!user) {
          responded = true;
          res.status(401).json({ error: 'Invalid username or password supplied.'} as ErrorResponse);
        }

        if (responded) {
          return null;
        }

        appUser = user;

        return crypto.validatePassword(password, user.password);
      })
      .then((areSame: boolean) => {
        if (!areSame && !responded) {
          responded = true;
          res.status(401).json({ error: 'Invalid username or password supplied.'} as ErrorResponse);
        }

        if (responded) {
          return null;
        }

        delete appUser.password;

        return userService.getRoles(appUser.id);
      })
      .then((roles: string[]) => {
        if (responded) {
          return null;
        }

        appUser.roles = roles;

        const userPayload = {
          id: appUser.id,
          username: appUser.username,
          roles: appUser.roles,
          first_name: appUser.first_name,
          last_name: appUser.last_name,
          activated: appUser.activated,
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
