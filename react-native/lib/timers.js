"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timers_1 = require("timers");
var es6_promise_1 = require("es6-promise");
function timeout(interval) {
    return new es6_promise_1.Promise(function (resolve, reject) {
        try {
            timers_1.setTimeout(resolve, interval);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.timeout = timeout;
exports.default = {
    timeout: timeout
};
