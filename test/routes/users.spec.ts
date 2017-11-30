import {} from 'mocha';
import { expect } from 'chai';
import fetch from 'node-fetch';

describe('Users Routes', () => {
  describe('Get /', () => {
    it('fetches the first 10 users', (done) => {
      fetch('http://localhost:3000/users', {
        method: 'GET'
      })
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then(json => {
          expect(json).to.be.an('array');

          done();
        })
        .catch(err => done(err));
    });
  });
});
