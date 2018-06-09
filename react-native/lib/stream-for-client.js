"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getstream_1 = __importDefault(require("getstream"));
var moment_1 = __importDefault(require("moment"));
var client = getstream_1.default.connect('htk5qzfncgtm', null, '38287');
var torontoFeed = client.feed('group', 'toronto-friends', '9X0CQU2PQ_X4g3z5XPi6qdZDeJ0');
function shareToronto(_a) {
    var note = _a.note;
    var object = moment_1.default.now();
    return torontoFeed.addActivity({
        verb: 'share',
        note: note,
        object: object,
        actor: 'lara'
    })
        .then(function (res) { return console.log(res); })
        .catch(function (err) { return console.error(err); });
}
function listToronto(callback) {
    return torontoFeed.get()
        .then(function (res) { return callback(res.results); })
        .then(function () { return torontoFeed.subscribe(function (res) { return callback(res.new); }); })
        .then(function () { return console.log('Subscribed'); })
        .catch(function (err) { return console.error('Oops?', err); });
}
function logFeedList(results) {
    console.log('subscription', results);
    // results.forEach(result => {
    //     console.log(result.note)
    // });
}
exports.default = {
    shareToronto: shareToronto,
    listToronto: listToronto,
    logFeedList: logFeedList
};
