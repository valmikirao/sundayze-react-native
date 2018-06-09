"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream = require('getstream');
var client = Stream.connect('htk5qzfncgtm', 'ttwyqe38m34tqcgw27jz5a8parjpx7unwrp5c4pqzemp3ee6zkpqfev6x2m5tt3v', '36624');
exports.torontoFeed = client.feed('group', 'toronto-friends');
