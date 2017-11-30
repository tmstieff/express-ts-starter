"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var database_1 = require("../../src/service/database");
describe('Database Service', function () {
    var db;
    before(function () {
        db = database_1.default.instance();
    });
    describe('query', function () {
        it('executes an arbitrary SQL query', function (done) {
            db.query('SELECT 1 as result')
                .then(function (results) {
                chai_1.expect(results.rows[0].result).to.equal(1);
                done();
            })
                .catch(function (err) { return done(err); });
        });
    });
});
