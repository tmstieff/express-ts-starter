"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
var app_user_queries_1 = require("./queries/app_user_queries");
/**
 * The UserService is responsible for saving, updating and retrieving
 * instances of the AppUser model.
 */
var UserService = /** @class */ (function () {
    function UserService() {
        this.db = database_1.default.instance();
    }
    UserService.prototype.getUsers = function (limit, offset) {
        if (limit === void 0) { limit = 10; }
        if (offset === void 0) { offset = 0; }
        return this.db.query(app_user_queries_1.USERS_LIMIT, [limit, offset])
            .then(function (results) {
            return results.rows;
        });
    };
    UserService.prototype.createUser = function (user) {
        return this.db.query(app_user_queries_1.INSERT_USER, [user.username, user.password, user.first_name, user.last_name])
            .then(function (result) {
            user.id = result.rows[0].id;
            return user;
        });
    };
    return UserService;
}());
exports.default = UserService;
