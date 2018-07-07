import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import { Storage } from 'aws-amplify';

import StreamClient from '../../lib/stream-for-client';
import { sdzConnect } from "../redux-utils";
import { Actions } from "../redux-reducer";


export const Camera = sdzConnect({
  dispatch : { closeCamera : Actions.closeCamera }
})(class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { note : null };
  }
  render() {
    let key = 0;

    return [
      <RNCamera key={ ++key }
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      />,
      <View key={ ++key } style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => this.takePicture(this.camera)}
          style={styles.capture}
        >
          <TextInput
            style={{height: 40}}
            placeholder="Note for pic"
            onChangeText={(note) => this.setState({ note })}
          />
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    ];
  }

  takePicture = function (camera) {
    if (camera) {
      this.props.closeCamera();

      const picKey = 'pic-' + Date.now().toString() + '.jpg';

      const pStorePic = camera.takePictureAsync({
        quality : 0.5,
        base64 : true
      })
        .then(pic => fetch(pic.uri))
        .then(res => res.blob())
        .then(blob => Storage.put(picKey, blob, {
          contentType: 'image/jpeg'
        }));

      const { note = '' } = this.state;
      const pSharePic = StreamClient.shareToronto({
        note,
        image : picKey
      });

      Promise.all([ pStorePic, pSharePic ])
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    else {
      console.error('Camera not there');
    }
  }
})

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
