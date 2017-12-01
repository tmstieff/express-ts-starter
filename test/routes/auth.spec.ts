import {} from 'mocha';
import { expect } from 'chai';
import fetch from 'node-fetch';
import * as uuid from 'uuid';

const login = (username: string, password: string) => {
  return fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

describe('Auth Routes', () => {
  describe('post /login', () => {
    it('returns the JWT when the username and password are valid', (done) => {
      login('admin@admin.com', 'password')
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

    it('returns 401 and an error message when the user doesn\'t exist', (done) => {
      login(uuid.v4(), 'password')
        .then(response => {
          expect(response.status).to.equal(401);

          return response.json();
        })
        .then(json => {
          expect(json.error).to.equal('Invalid username or password supplied.');

          done();
        })
        .catch(err => done(err));
    });


    it('returns 401 and an error message when the password is wrong', (done) => {
      login('admin@admin.com', 'notpassword')
        .then(response => {
          expect(response.status).to.equal(401);

          return response.json();
        })
        .then(json => {
          expect(json.error).to.equal('Invalid username or password supplied.');

          done();
        })
        .catch(err => done(err));
    });
  });
});
