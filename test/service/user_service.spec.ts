import {} from 'mocha';
import { expect } from 'chai';
import UserService from '../../src/service/user_service';
import { AppUser } from '../../src/model/app_user';
import * as uuid from 'uuid';

describe('User Service', () => {
  let svc: UserService;
  before(() => {
    svc = new UserService();
  });

  describe('getUserById', () => {
    it('gets a single user by a user ID', (done) => {
      // Retrive the seeded admin user
      svc.getUserById(1)
        .then((retrievedUser: AppUser) => {
          expect(retrievedUser.id).to.equal(1);

          done();
        })
        .catch(err => done(err));
    });

    it('returns null if no user exists', (done) => {
      svc.getUserById(-1)
        .then((retrievedUser: AppUser) => {
          expect(retrievedUser).to.be.null;

          done();
        })
        .catch(err => done(err));
    })
  });

  describe('getUserByUsername', () => {
    it('gets a single user by a username', (done) => {
      // Retrive the seeded admin user
      svc.getUserByUsername('admin@admin.com')
        .then((retrievedUser: AppUser) => {
          expect(retrievedUser.id).to.equal(1);

          done();
        })
        .catch(err => done(err));
    });

    it('returns null if no user exists', (done) => {
      svc.getUserByUsername('somename' + uuid.v4())
        .then((retrievedUser: AppUser) => {
          expect(retrievedUser).to.be.null;

          done();
        })
        .catch(err => done(err));
    })
  });

  describe('getUsers', () => {
    it('gets a specified number of users by an offset', (done) => {
      svc.getUsers()
        .then((users: AppUser[]) => {
          expect(users[0].id).to.equal(1, 'The results should be sorted by ID');
          expect(users[0].username).to.equal('admin@admin.com', 'The seeded admin user should be the first result');

          done();
        })
        .catch(err => done(err));
    });
  });

  describe('createUser', () => {
    it('creates a posted user model and returs the user with the new ID', (done) => {
      const username = uuid.v4();

      const user: AppUser = {
        username,
        password: 'testpassword',
        first_name: 'Test',
        last_name: 'User'
      };

      svc.createUser(user)
        .then((newUser: AppUser) => {
          expect(newUser.id).to.not.be.undefined;
          expect(newUser.password).to.be.undefined;

          done();
        })
        .catch(err => done(err));
    });
  });
});
