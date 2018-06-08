var stream = require('getstream');

client = stream.connect('enpdtmyzrhhh', null, '36624');
eric = client.feed('user', 'eric', 'AsNQVPXH6EO_CAKQUIAEQQIssw0');

module.exports = {client, eric};
