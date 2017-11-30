import {} from 'mocha';
import { expect } from 'chai';
import UserService from '../../src/service/user_service';
import { AppUser } from '../../src/model/app_user';

describe('User Service', () => {
  let svc: UserService;
  before(() => {
    svc = new UserService();
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



  });
});
