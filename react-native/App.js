import _ from 'lodash';
import qs from 'qs';

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
          onPress={() => postToWall(this.state.text)}
          title="Post!"
        />
      </View>
    );
  }
}

function _formData(args) {
  const formData = new FormData();
  _.forOwn(args, (value, key) => formData.append(key, value));
  return formData;
}

function postToWall(text) {
  const body = _formData({
    "_csrf": "R1IJ2Ai3_OrnRbYQxDhgZ_ndoGHmhGqBakeU-7sDknYY-yI0EuaNszQ3ZB7HICyF3tOuL6pDLT6EGNlFihp4bg==",
    "message": text,
    "containerGuid": "a5de0bce-2616-4af2-a6e5-841f9955f7b7",
    "containerClass": "humhub\\modules\\space\\models\\Space"
  });

  const headers = {
    referer: 'https://ec2-54-235-233-111.compute-1.amazonaws.com/humhub/index.php?r=space%2Fspace&sguid=a5de0bce-2616-4af2-a6e5-841f9955f7b7',
    connection: 'keep-alive',
    cookie: 'pm_getting-started-panel=expanded; pm_space-members-panel=expanded; language=5d61d394b8678f9a3444effe2350223f3ebeb0711201f73153517afe27834b7ca%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en_gb%22%3B%7D; _csrf=1927166b31e62dfe1c1f7342b286911c017673a36f811f21512cbceccb92bb68a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22_%A9%2B%EC%1AQqY%D3r%D2%0E%03%18L%E2%27%0E%0ENL%C7G%BF%EE_M%BE1%19%EA%18%22%3B%7D; _identity=b3dd0735a8cbf3c3f81a1154fa046c493e19212acae8bbd65594f858f2614305a%3A2%3A%7Bi%3A0%3Bs%3A9%3A%22_identity%22%3Bi%3A1%3Bs%3A50%3A%22%5B2%2C%222e29d3f4-015b-48fa-a4d0-674e2bd9b9b1%22%2C2592000%5D%22%3B%7D; PHPSESSID=io9gm2fjoelp75qkg27eg4iej0',
    'x-requested-with': 'XMLHttpRequest',
    'cache-control': 'no-cache',
    accept: 'application/json, text/javascript, */*; q=0.01',
    'content-type': 'application/x-www-form-urlencoded',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'accept-language': 'en-US,en;q=0.9',
    'x-csrf-token': 'FFJKRBRAphP37BxGk9VnzSjOslsck6xaBQwlxs5fuHtL-2GoDhHXSiSezkiQzSsvD8C8FVBU6-XrU2h4_0ZSYw==',
    'accept-encoding': 'gzip, deflate, br',
    origin: 'https://ec2-54-235-233-111.compute-1.amazonaws.com',
    pragma: 'no-cache'
  };

  const qs_ = qs.stringify({
    r: 'post/post/post',
    sguid: 'a5de0bce-2616-4af2-a6e5-841f9955f7b7'
  });

  const url = 'http://ec2-54-235-233-111.compute-1.amazonaws.com/humhub/index.php?' + qs_;
  fetch(url, {
    method: "POST",
    body, headers
  })
  .then(response => {
    response.text().then(text => console.log('text', text))
    response.json().then(text => console.log('json', text))
  }).catch(err => console.error(err))
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