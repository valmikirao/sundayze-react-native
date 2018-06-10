import {setTimeout} from 'timers';
import {Promise} from "es6-promise";

export function timeout(interval) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, interval);
        }
        catch(err) {
            reject(err);
        }
    })
}

export default {
    timeout
}