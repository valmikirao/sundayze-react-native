import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, AppRegistry } from 'react-native';

// import {login} from './lib/login';
import {eric} from './lib/stream-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      password: 'Insecure123'
    };
  }

  render() {
    const onPress = () => {
      const {username, password} = this.state;
      login({username, password});
    };

    debugger

    return <View style={styles.container}>
      <Text>Danger Zone!!!</Text>
    </View>;

    /*
    return (
      <View style={styles.container}>
        <Text>Write something to post</Text>
        <TextInput
          style={{height: 40, padding: 10}}
          placeholder="username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={{height: 40, padding: 10}}
          placeholder="password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          onPress={onPress}
          title="Login!"
        />
      </View>
    );
    */
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