import React from 'react';
import { createStore } from 'redux';
import { Provider }  from 'react-redux';
import {
  AppRegistry,
  View
} from 'react-native';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

import { withAuthenticator } from 'aws-amplify-react-native'

// import Stream from './lib/stream-for-client';
import { GroupView } from './lib/components/group-view';
import { styles } from './lib/styles/app-styles';
import { Actions, reducer } from "./lib/redux-reducer";

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
    return (
      <View style={ styles.app }>
        <GroupView/>
      </View>
    );
  }

}

let store = createStore(reducer);
store.dispatch(Actions.init());

export default ReduxApp = withAuthenticator(class extends React.Component {
  render() {
    return <Provider store={ store }>
      <App/>
    </Provider>;
  }
});

AppRegistry.registerComponent('AwesomeProject', () => ReduxApp);
