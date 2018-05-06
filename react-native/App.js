import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, AppRegistry } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Write something to post</Text>
        <TextInput
          style={{height: 40, padding: 10}}
          placeholder="This will be your post"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={() => {
            formData = new FormData()
            formData.append('username', 'test');
            formData.append('password', 'Insecure123')
            fetch('http://ec2-54-235-233-111.compute-1.amazonaws.com/humhub/index.php', {
              method: 'POST',
              body: formData
            })
            .then(response => {
              debugger;
              console.log('You tapped the button with <' + response + '>');
            }).catch(err => console.log(err))
          }}
          title="Post!"
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