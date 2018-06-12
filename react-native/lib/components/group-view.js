import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry } from 'react-native';
import sdzExceptions from '../exceptions';

export class StreamOfSharedItems extends React.Component {
  render() {
    let key = 0;
    const { sharedItems } = this.props
    return  sharedItems.map(share => <Text key={ key++ }>
          { share.note } at { share.time }
      </Text>);
  }
}
