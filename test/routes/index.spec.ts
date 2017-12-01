import {} from 'mocha';
import { expect } from 'chai';
import fetch from 'node-fetch';

describe('/ Index Routes', () => {
  describe('Get /', () => {
    it('fetches the index message', (done) => {
      fetch('http://localhost:3000/', {
        method: 'GET'
      })
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then(json => {
          expect(json).to.equal("Hello world!");

          done();
        })
        .catch(err => done(err));
    });
  });
});
