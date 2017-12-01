import {} from 'mocha';
import { expect } from 'chai';
import fetch, { BodyInit } from 'node-fetch';

describe('Auth Routes', () => {
  describe('post /login', () => {
    it('returns the JWT when the username and password are valid', (done) => {
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: 'admin@admin.com',
          password: 'password',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then(json => {
          expect(json).to.be.an('object');
          expect(json.user).to.be.an('object');
          expect(json.token).to.be.a('string');

          expect(json.user.username).to.equal('admin@admin.com');
          expect(json.user.password).to.be.undefined;

          done();
        })
        .catch(err => done(err));
    });
  });
});
