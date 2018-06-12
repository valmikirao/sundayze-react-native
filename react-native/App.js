import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AppRegistry } from 'react-native';
// import Stream from './lib/stream-for-client';
import { StreamOfSharedItems } from './lib/components/group-view';


export default class App extends React.Component<{}, IAppState> {
  constructor(props : {}) {
    super(props);

    this.state = {
        note : null,
        shares : [
          {
            note: 'Hello',
            time : '1/1/2018'
          },
          {
            note: 'Goodbye',
            time : '1/1/2018'
          }
        ]
    };

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
    const {state} = this;
    const onPress = () => {
      const {note} = state;

      // Stream.shareToronto({note});
    };

    debugger;
    let key = 0;

    const {shares} = state;
    const sharesAsComponents = shares.map(share => <Text key={ key++ }>
        {share.note} at {share.time}
    </Text>);

    return (
      <View style={styles.container}>
        <StreamOfSharedItems sharedItems={ [shares[0]] }/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => App);