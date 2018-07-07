import Stream from 'getstream';
import moment from 'moment';


const client = Stream.connect('htk5qzfncgtm', null, '38287');


const torontoFeed = client.feed('group', 'toronto-friends', '9X0CQU2PQ_X4g3z5XPi6qdZDeJ0');

function shareToronto({note, picUri = null}) {
  const object = `${moment.now()}`;

  return torontoFeed.addActivity({
    verb: 'share',
    note, picUri,
    object,
    actor : 'lara'
  })
    .then(res => console.log(res))
    .catch(err => console.error(err))

}

function listToronto( callback ) {
  return torontoFeed.get()
    .then( res => callback(res.results) )
    .then(() => torontoFeed.subscribe(res => callback(res.new)) )
    .then(() => console.log('Subscribed'))
    .catch(err => console.error('Oops?', err));
}

function logFeedList(results : any) {
  console.log('subscription', results);
  // results.forEach(result => {
  //   console.log(result.note)
  // });
}

export default {
  shareToronto,
  listToronto,
  logFeedList
}
