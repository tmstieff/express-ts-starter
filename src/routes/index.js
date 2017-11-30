"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setup = function (router) {
    router.get('/', function (req, res) {
        res.status(200).json("Hello world!");
    });
};
exports.default = setup;
