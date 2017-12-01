import { Router, Request, Response } from 'express';

const setup = (router: Router) => {
  router.get('/', (req: Request, res: Response) => {
    res.status(200).json("Hello world!");
  });
};

export default setup;
