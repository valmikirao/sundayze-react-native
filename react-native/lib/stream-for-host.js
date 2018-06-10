const Stream = require('getstream');
const client = Stream.connect('htk5qzfncgtm', 'ttwyqe38m34tqcgw27jz5a8parjpx7unwrp5c4pqzemp3ee6zkpqfev6x2m5tt3v', '36624');

export const torontoFeed = client.feed('group', 'toronto-friends');

