import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry, FlatList, Image } from 'react-native';
import sdzExceptions from '../exceptions';

class SharedItem extends React.Component {
  render () {
    return  <Image
          style={{width: 66, height: 58}}
          source={{uri: TEST_IMAGES[0]}}
        />
  }
}

export class StreamOfSharedItems extends React.Component {
  render() {
    let key = 0;
    const data = this.props.sharedItems.map(
      ({note, time}) => ({note, time})
    );
    
    function renderItem({item}) {
      const {note, time} = item;
      return <View>
        <SharedItem/>
        <Text>{ note } at { time }</Text>
      </View>
    }
    
    return <FlatList 
      data={ data }
      renderItem={ renderItem }
    />
  }
}

const TEST_IMAGES = [
  'data:image/png;base64,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',
  ]
