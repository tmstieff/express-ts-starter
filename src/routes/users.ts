import { Router, Request, Response } from 'express';
import Database from '../service/database';
import UserService from '../service/user_service';
import { AppUser } from '../model/app_user';

const userService = new UserService();

const setup = (router: Router) => {
  router.get('/users', (req: Request, res: Response) => {
    let limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    if (limit > 20) {
      limit = 20;
    }

    return userService.getUsers(limit, offset)
      .then((users: AppUser[]) => res.status(200).json(users));
  });

  router.post('/users', (req: Request, res: Response) => {
    const user: AppUser = req.body as AppUser;

    return userService.createUser(user)
      .then((newUser: AppUser) => res.status(200).json(newUser));
  });
};

export default setup;
