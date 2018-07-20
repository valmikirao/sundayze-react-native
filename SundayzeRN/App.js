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
import { Camera } from './lib/components/camera';
import { YourGroups } from "./lib/components/your-groups";

import { styles } from './lib/styles/app-styles';
import { Actions, Screens, reducer } from "./lib/redux-reducer";
import { sdzConnect } from "./lib/redux-utils";
import { TestingStates } from "./lib/redux-reducer";

const App = sdzConnect({
  base : (state) => state.view,
  pick : ['screen']
})(class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let inner = null;

    switch (this.props.screen) {
      case Screens.GROUP_VIEW : {
        inner = <GroupView/>;
        break;
      }
      case Screens.CAMERA : {
        inner = <Camera/>;
        break;
      }
      case Screens.YOUR_GROUPS : {
        inner = <YourGroups/>;
        break;
      }
      default : {
        throw new DOMException(`[${this.props.screen}] invalid value for props.screen`);
      }
    }

    return (
      <View style={ styles.app }>
        { inner }
      </View>
    );
  }
});

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
// const authed = withAuthenticator;
// store.dispatch(Actions.init());
// Stream.listToronto(newItems => store.dispatch(
//   Actions.fetchedSharedItems(newItems)
// ));

// for debugging
authed = identity => identity;
store.dispatch(Actions._testing.setState(TestingStates.NO_GROUPS));


export default ReduxApp = authed(class extends React.Component {
  render() {
    return <Provider store={ store }>
      <App/>
    </Provider>;
  }
});
