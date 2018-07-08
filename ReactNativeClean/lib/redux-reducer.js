import { Alert } from "react-native";
import _ from 'lodash';
import moment from 'moment-timezone';


const image_x = require('../src-assets/X.png');
const selfie = require('../src-assets/selfie.png');
const selfie2 = require('../src-assets/selfie-2.png');

let DEBUG_SHARED_ITEMS = [
  {
    note: 'Hello 3',
    time: '1/1/2018',
    pic: selfie
  },
  {
    note: 'Goodbye',
    time: '1/1/2019',
    pic: selfie2,
  },
  {
    note: 'Good morning',
    time: '1/2/2019',
    pic: selfie,
  },
  {
    note: 'Good evening',
    time: '1/2/2019',
    pic: selfie2,
  }
];

export function reducer(state, action) {
  switch (action.type) {
    case Types.INIT : {
      return {
        data : {},
        view: {
          cameraActive : false
        }
      }
    }
    case Types.OPEN_CAMERA : {
      return {
        data : { ...state.data },
        view : {
          cameraActive : true
        }
      }
    }
    case Types.FETCHED_SHARED_ITEM : {
      const sharedItemsData = appendFetchedSharedItems(state, action.payload);

      const { cameraActive } = state.view;
      const sharedItemsView = ! cameraActive &&
        sharedItemsDataToView(sharedItemsData);

      return {
        data : { sharedItems : sharedItemsData },
        view : {
          cameraActive,
          sharedItems : sharedItemsView
        }
      };
    }
    case Types.CLOSE_CAMERA : {
      const sharedItemsView = sharedItemsDataToView(state.data.sharedItems);

      return {
        data : { ...state.data },
        view : { sharedItems : sharedItemsView }
      }
    }
    default :
      return state;
  }
}

function appendFetchedSharedItems(state, fetchedItemsRaw) {
  const fetchedItems = fetchedItemsRaw.map(raw => ({
    id: raw.id,
    note: raw.note,
    image: raw.image,
    // These seem to be GMT, so store them as such
    time: moment.tz(raw.time, 'YYYY-MM-DD[T]HH:mm:ss.SSS', 'GMT')
  }));

  const {sharedItems = []} = state.data;

  let allSharedItems = [
    ...sharedItems,
    ...fetchedItems,
  ];

  allSharedItems = _.orderBy(allSharedItems, ['time', 'id'], ['desc']); // sort by id to keep deterministic

  return allSharedItems;
}

function sharedItemsDataToView(allSharedItems = []) {

  // current timezone
  const tz = moment.tz.guess();

  const sharedItemsView = allSharedItems.map(item => ({
    note: item.note,
    image: item.image,
    time: item.time.tz(tz).format('MM/DD/YYYY HH:mm')
  }));

  return sharedItemsView;
}

const Types = {
  CLOSE_CAMERA        : 'CLOSE_CAMERA',
  FETCHED_SHARED_ITEM : 'FETCHED_SHARED_ITEM',
  INIT                : 'INIT',
  OPEN_CAMERA         : 'OPEN_CAMERA'
};

export class Actions {
  static init() {
    return { type: Types.INIT }
  }

  static openCamera() {
    return { type: Types.OPEN_CAMERA }
  }

  static closeCamera() {
    return { type: Types.CLOSE_CAMERA }
  }

  static fetchedSharedItems(sharedItems) {
    return {
      type : Types.FETCHED_SHARED_ITEM,
      payload : sharedItems,
    }
  }
}

function _test() {
  Alert.alert(null, 'Passed Tests')

  let state = reducer(Actions.init())
}
