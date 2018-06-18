import React from 'react';
import { createStore } from 'redux';
import { Provider }  from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry, Image } from 'react-native';

// import Stream from './lib/stream-for-client';
import { GroupView } from './lib/components/group-view';
import { styles } from './lib/styles/app-styles';

const image_x = require('./src-assets/X.png');
const selfie = require('./src-assets/selfie.png');
const selfie2 = require('./src-assets/selfie-2.png');

let DEBUG_SHARED_ITEMS = [
  {
    note: 'Hello',
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

// DEBUG_SHARED_ITEMS = [
//   ...DEBUG_SHARED_ITEMS,
//   ...DEBUG_SHARED_ITEMS,
//   ...DEBUG_SHARED_ITEMS
// ];

class App extends React.Component {
  constructor(props) {
    super(props);

    // Stream.listToronto(responseShares => {
    //     const newShares = responseShares.map(share => ({
    //             note: share.note,
    //             time: share.time
    //     }));

    //     this.setState({
    //         ...this.state,
    //         shares : [
    //             ...this.state.shares,
    //             ...newShares
    //         ]
    //     })
    // })
  }

  render() {
    const {state, props} = this;
    
    const onPress = () => {
      const {note} = state;

      // Stream.shareToronto({note});
    };

    let key = 0;

    return (
      <View style={styles.app }>Reac
        <GroupView/>
      </View>
    );
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'INIT' : {
      return {
        sharedItems : DEBUG_SHARED_ITEMS
      }
    }
    default : 
      return state;
  }
}

let store = createStore(reducer);
store.dispatch({type : 'INIT'});

export default class ReduxApp extends React.Component {
  render() {
    return <Provider store={ store }>
      <App/>
    </Provider>;
  }
}

AppRegistry.registerComponent('AwesomeProject', () => ReduxApp);
