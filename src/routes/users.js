"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../service/database");
var user_service_1 = require("../service/user_service");
var db = database_1.default.instance();
var userService = new user_service_1.default();
var setup = function (router) {
    router.get('/users', function (req, res) {
        return userService.getUsers()
            .then(function (users) { return res.status(200).json(users); });
    });
    router.post('/users', function (req, res) {
        var user = req.body;
        return userService.createUser(user)
            .then(function (newUser) { return res.status(200).json(newUser); });
    });
};
exports.default = setup;
