import { Alert } from "react-native";
import _ from 'lodash';
import moment from 'moment';


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
        view: { sharedItems : [] }
      }
    }
    case Types.OPEN_CAMERA : {
      return {
        ...state,
        view : {
          ...state.view,
          cameraActive : true
        }
      }
    }
    case Types.FETCHED_SHARED_ITEM : {
      return fetchedSharedItems(state, action.payload);
    }
    default :
      return state;
  }
}

function fetchedSharedItems(state, fetchedItemsRaw) {
  const fetchedItems = fetchedItemsRaw.map(raw => ( {
    id: raw.id,
    note: raw.note,
    image: raw.image,
    time: moment(raw.time, 'YYYY-MM-DD[T]HH:mm:ss.SSS')
  }));

  const { sharedItems = [] } = state.data;

  let allSharedItems = [
    ...sharedItems,
    ...fetchedItems,
  ];

  allSharedItems = _.orderBy(allSharedItems, ['time', 'id'], ['desc']); // sort by id to keep deterministic

  const sharedItemsView = allSharedItems.map(item => ({
    note : item.note,
    image : item.image,
    time : item.time.format('MM/DD/YYYY HH:mm')
  }));

  // TODO: timezones?

  return {
    data : {
      ...state.data,
      sharedItems : allSharedItems,
    },
    view : {
      ...state.view,
      sharedItems : sharedItemsView,
    }
  }
}

const Types = {
  INIT                : 'INIT',
  OPEN_CAMERA         : 'OPEN_CAMERA',
  FETCHED_SHARED_ITEM : 'FETCHED_SHARED_ITEM'
};

export class Actions {
  static init() {
    return { type: Types.INIT }
  }

  static openCamera() {
    return { type: Types.OPEN_CAMERA }
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
