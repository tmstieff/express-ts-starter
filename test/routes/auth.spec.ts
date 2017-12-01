import {} from 'mocha';
import { expect } from 'chai';
import * as uuid from 'uuid';
import { login } from '../auth_helper';
import fetch from 'node-fetch';
import AuthLoginResponse from '../../src/model/rest/auth_login_response';

describe('Auth Routes', () => {
  describe('get /', () => {
    it('returns an error if the current user is not logged in', (done) => {
      fetch('http://localhost:3000/auth')
        .then(response => {
          expect(response.status).to.equal(401);

          return response.json();
        })
        .then(json => {
          console.log(json);

          done();
        })
        .catch(err => done(err));
    });

    it('returns the current user if the token supplied is valid', (done) => {
      let token = '';
      login('admin@admin.com', 'password')
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then((json: AuthLoginResponse) => {
          expect(json.token).to.not.be.undefined;
          token = json.token;

          return fetch('http://localhost:3000/auth', {
            method: 'GET',
            headers: {
              'Bearer': token,
            }
          });
        })
        .then(response => {
          expect(response.status).to.equal(200);

          return response.json();
        })
        .then(json => {
          expect(json.username).to.equal('admin@admin.com');
          expect(json.password).to.be.undefined;

          done();
        })
        .catch(err => done(err));
    });
  });

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
