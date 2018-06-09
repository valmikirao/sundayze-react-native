import torontoFeed from "../lib/stream-for-client";
import moment from 'moment';
import {timeout} from "../lib/timers";

console.log('Running');

torontoFeed.listToronto(torontoFeed.logFeedList);

console.log('setting timeout')
timeout(5000)
    .then(() => torontoFeed.shareToronto({note: 'more more sharing'}));
// console.log(torontoFeed.token)



// let note = 'Working?'
// console.log(`Posting '${note}'`);
// const object = moment.now()
//
// torontoFeed.addActivity({
//     verb: 'share',
//     note,
//     object : '[timestamp?]',
//     actor : 'lara'
// })
//     .then(res => console.log(res))
//     .catch(err => console.error(err))
