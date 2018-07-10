import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider }  from 'react-redux';
import {
  AppRegistry,
  View,
  Platform
} from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native'
import { createLogger }from 'redux-logger';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


import Stream from './lib/stream-for-client';
import { GroupView } from './lib/components/group-view';
import { styles } from './lib/styles/app-styles';
import { Actions, reducer } from "./lib/redux-reducer";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.app }>
        <GroupView/>
      </View>
    );
  }

}

let stateLogCount = 0;
let actionLogCount = 0;
const reduxLogger = createLogger({
  stateTransformer : state => {
    // seem to need to deffer these to make them work properly
    setTimeout(() => {
      console.groupCollapsed('state {' + stateLogCount++ + '}');
      console.log(JSON.stringify(state, null, 2)); // useful for copy paste
      console.groupEnd();
    }, 0);

    return state;
  },
  actionTransformer : action => {
    setTimeout(() => {
      console.groupCollapsed('action {' + actionLogCount++ + '}');
      console.log(JSON.stringify(action, null, 2)); // useful for copy paste
      console.groupEnd();
    }, 0);

    return action;
  }
});
let store = createStore(
  reducer,
  applyMiddleware(reduxLogger)
);
store.dispatch(Actions.init());

Stream.listToronto(newItems => store.dispatch(
  Actions.fetchedSharedItems(newItems)
));

export default ReduxApp = withAuthenticator(class extends React.Component {
  render() {
    return <Provider store={ store }>
      <App/>
    </Provider>;
  }
});

AppRegistry.registerComponent('AwesomeProject', () => ReduxApp);
