"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var user_service_1 = require("../../src/service/user_service");
describe('User Service', function () {
    var svc;
    before(function () {
        svc = new user_service_1.default();
    });
    describe('getUsers', function () {
        it('gets a specified number of users by an offset', function (done) {
            svc.getUsers()
                .then(function (users) {
                chai_1.expect(users[0].id).to.equal(1, 'The results should be sorted by ID');
                chai_1.expect(users[0].username).to.equal('admin@admin.com', 'The seeded admin user should be the first result');
                done();
            })
                .catch(function (err) { return done(err); });
        });
    });
    describe('createUser', function () {
    });
});
