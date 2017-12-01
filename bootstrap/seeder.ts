import * as config from 'config';
import * as pg from 'pg';
import * as fs from 'fs';
import { Promise } from 'es6-promise';

const readFile = (file: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};

const seedDatabase = () => {
  const pool = new pg.Pool(config.get('pg'));

  return pool.query('CREATE DATABASE ' + config.get('pg.database'))
    .then(() => readFile('bootstrap/tables.sql'))
    .then(data => pool.query(data))
    .then(() => readFile('bootstrap/seed.sql'))
    .then(data => pool.query(data))
    .then(() => readFile('bootstrap/test_seed.sql'))
    .then(data => pool.query(data))
    .catch(err => {
      console.error(err);
      return err
    });
};

seedDatabase()
  .then(() => console.log('Seeding complete'));
