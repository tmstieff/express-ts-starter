"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var config = require("config");
var pool = new pg.Pool(config.get('pg'));
exports.pgpool = {
    pool: pool
};
