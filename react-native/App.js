import React from 'react';
import { createStore } from 'redux';
import { Provider }  from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry, Image } from 'react-native';
// import Stream from './lib/stream-for-client';
import { GroupView } from './lib/components/group-view';

let DEBUG_SHARED_ITEMS = [
  {
    note: 'Hello',
    time : '1/1/2018'
  },
  {
    note: 'Goodbye',
    time : '1/1/2019'
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
      <View style={styles.container}>
        <GroupView/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
};



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
