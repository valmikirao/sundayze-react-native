import { Alert } from "react-native";

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
          sharedItems : DEBUG_SHARED_ITEMS,
        }
      }
    }
    case Types.OPEN_CAMERA : {
      return {
        data : { ...state.data },
        view : { cameraActive : true }
      }
    }
    default :
      return state;
  }
}

const Types = {
  INIT        : 'INIT',
  OPEN_CAMERA : 'OPEN_CAMERA'
};

export class Actions {
  static init() {
    return { type: Types.INIT }
  }

  static openCamera() {
    return { type: Types.OPEN_CAMERA }
  }
}

function _test() {
  Alert.alert(null, 'Passed Tests')

  let state = reducer(Actions.init())
}
