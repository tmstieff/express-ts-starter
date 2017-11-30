import { Router } from 'express';

const setup = (router: Router) => {
  router.get('/', (req, res) => {
    res.status(200).json("Hello world!");
  });
};

export default setup;
