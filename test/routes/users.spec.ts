import {} from 'mocha';
import { expect } from 'chai';
import fetch from 'node-fetch';

/**
 * This test relies on the test_seed.sql data in the bootstrap folder
 */
describe('/users Routes', () => {
  describe('Get /', () => {
    it('fetches the first 10 users by default', (done) => {
      fetch('http://localhost:3000/users', {
        method: 'GET'
      })
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then(json => {
          expect(json).to.be.an('array');
          expect(json.length).to.equal(10, '10 users should be retrieved by default');
          expect(json[0].id).to.equal(1, 'The first result should be user 1');
          expect(json[9].id).to.equal(10, 'The last result should be user 10');

          done();
        })
        .catch(err => done(err));
    });

    it('fetches the first 5 users offset by 5 when specified in the query params', (done) => {
      fetch('http://localhost:3000/users?limit=5&offset=5', { method: 'GET' })
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then(json => {
          expect(json.length).to.equal(5, 'The results should be limited to 5');
          expect(json[0].id).to.equal(6, 'The first result should be user 6');
          expect(json[4].id).to.equal(10, 'The last result should be user 10');

          done();
        })
        .catch(err => done(err));
    });
  });
});
