import { Alert } from "react-native";
import _ from 'lodash';
import moment from 'moment-timezone';

export const Screens = {
  CAMERA : 'CAMERA',
  GROUP_VIEW : 'GROUP_VIEW',
  YOUR_GROUPS : 'YOUR_GROUPS'
};

const Types = {
  CLOSE_CAMERA : 'CLOSE_CAMERA',
  FETCHED_SHARED_ITEM : 'FETCHED_SHARED_ITEM',
  INIT : 'INIT',
  OPEN_CAMERA : 'OPEN_CAMERA',
  SIGN_IN : 'SIGN_IN',
  SIGN_OUT : 'SIGN_OUT',
  // This just sets the state to whatever, good for testing
  _testing : { SET_STATE : '_testing.SET_STATE' }
};


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
    case Types._testing.SET_STATE : {
      return action.payload;
    }
    default :
      return state;
  }
}

const TestingStatesConsts = {
  FETCHED_DATA: [
    {
      "id": "bbbbf06d-878c-11e8-9501-0a081e7097fe",
      "note": "Hhhh",
      "image": "pic-1531589914852.jpg",
      "time": "2018-07-14T17:38:34.962Z"
    },
    {
      "id": "f8be9097-8556-11e8-9efe-0a081e7097fe",
      "note": "Jgjhg",
      "image": "pic-1531346922140.jpg",
      "time": "2018-07-11T22:08:42.172Z"
    }
  ]
}

export const TestingStates = {
  INIT : {
    "data": {},
    "view": {
      "screen": Screens.GROUP_VIEW,
    }
  },
  FETCHED : {
    "data": {
      "sharedItems": TestingStatesConsts.FETCHED_DATA
    },
    "view": {
      "screen": Screens.GROUP_VIEW,
      "sharedItems": [
        {
          "note": "Hhhh",
          "image": "pic-1531589914852.jpg",
          "time": "07/14/2018 13:38"
        },
        {
          "note": "Jgjhg",
          "image": "pic-1531346922140.jpg",
          "time": "07/11/2018 18:08"
        }
      ]
    }
  },
  CAMERA : {
    "data" : {
      "sharedItems": TestingStatesConsts.FETCHED_DATA
    },
    "view": { "screen" : Screens.CAMERA }
  },
  NO_GROUPS : {
    "data" : { "groups" : [] },
    "view" : {
      "screen" : Screens.YOUR_GROUPS,
      "groups" : []
    }
  }
};

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
    note : item.note,
    image : item.image,
    time : item.time.tz(tz).format('MM/DD/YYYY HH:mm')
  }));

  return sharedItemsView;
}

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

  static _testing = {
    setState : (state) => ({
      type: Types._testing.SET_STATE,
      payload : state
    })
  };

  // not used yet
  static signOut() {
    return { type: Types.SIGN_OUT }
  }

  static signIn() {
    return { type : Types.SIGN_IN }
  }
}

function _test() {
  Alert.alert(null, 'Passed Tests')

  let state = reducer(Actions.init())
}
