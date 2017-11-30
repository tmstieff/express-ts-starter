"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var node_fetch_1 = require("node-fetch");
describe('Index Routes', function () {
    describe('Get /', function () {
        it('fetches the index message', function (done) {
            node_fetch_1.default('http://localhost:3000/', {
                method: 'GET'
            })
                .then(function (response) {
                chai_1.expect(response.status).to.equal(200);
                return response.json();
            })
                .then(function (json) {
                chai_1.expect(json).to.equal("Hello world!");
                done();
            })
                .catch(function (err) { return done(err); });
        });
    });
});
