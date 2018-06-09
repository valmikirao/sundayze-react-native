import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry } from 'react-native';
import Stream from './lib/stream-for-client';

interface IAppState {
    note? : string,
    shares : {
        note: string,
        time: string
    }[]
}

export default class App extends React.Component<{}, IAppState> {
  constructor(props : {}) {
    super(props);

    this.state = {
        note : null,
        shares : [{
            note: 'This is working, sort of',
            time: '2018-06-09T19:40:38.035904'
        }]
    };
  }

  render() {
    const {state} = this;
    const onPress = () => {
      const {note} = state;

      Stream.shareToronto({note});
    };

    debugger;

    const {shares} = state;
    const sharesAsComponents = shares.foreach(share => <Text>
        {share.note} at {share.time}
    </Text>);

    return (
      <View style={styles.container}>
        { sharesAsComponents }
        <Text>Write something to post</Text>
        <TextInput
          style={{height: 40, padding: 10}}
          placeholder="note"
          onChangeText={note => this.setState({
              ...state,
              note
          })}
        />
        <Button
          onPress={onPress}
          title="Share!"
        />
      </View>
    );
  }
}

export default class

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => App);