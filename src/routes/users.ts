import { Router, Request, Response } from 'express';
import Database from '../service/database';
import UserService from '../service/user_service';
import { AppUser } from '../model/app_user';

const db = Database.instance();
const userService = new UserService();

const setup = (router: Router) => {
  router.get('/users', (req: Request, res: Response) => {
    return userService.getUsers()
      .then((users: AppUser[]) => res.status(200).json(users));
  });

  router.post('/users', (req: Request, res: Response) => {
    const user: AppUser = req.body as AppUser;

    return userService.createUser(user)
      .then((newUser: AppUser) => res.status(200).json(newUser));
  });
};

export default setup;
