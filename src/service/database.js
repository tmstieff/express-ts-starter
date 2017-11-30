"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pgpool_1 = require("./pgpool");
var Database = /** @class */ (function () {
    function Database(pool) {
        this.pool = pool;
    }
    Database.initialize = function () {
        this.db = new Database(pgpool_1.pgpool.pool);
    };
    Database.prototype.query = function (sql, values) {
        return this.pool.query(sql, values);
    };
    Database.instance = function () {
        if (this.db) {
            return this.db;
        }
        this.initialize();
        return this.db;
    };
    return Database;
}());
exports.default = Database;
