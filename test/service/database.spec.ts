import {} from 'mocha';
import { expect } from 'chai';
import * as pg from 'pg';
import Database from '../../src/service/database';

describe('Database Service', () => {
  let db;
  before(() => {
    db = Database.instance();
  });

  describe('query', () => {

    it('executes an arbitrary SQL query', (done) => {
      db.query('SELECT 1 as result')
        .then((results: pg.QueryResult) => {
          expect(results.rows[0].result).to.equal(1);

          done();
        })
        .catch(err => done(err));
    })

  })
});
