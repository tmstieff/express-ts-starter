"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("config");
var pg = require("pg");
var fs = require("fs");
var es6_promise_1 = require("es6-promise");
var readFile = function (file) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};
var seedDatabase = function () {
    var pool = new pg.Pool(config.get('pg'));
    return readFile('bootstrap/tables.sql')
        .then(function (data) { return pool.query(data); })
        .then(function () { return readFile('bootstrap/seed.sql'); })
        .then(function (data) { return pool.query(data); })
        .then(function () { return readFile('bootstrap/test_seed.sql'); })
        .then(function (data) { return pool.query(data); })
        .catch(function (err) {
        console.error(err);
        return err;
    });
};
seedDatabase()
    .then(function () { return console.log('Seeding complete'); });
