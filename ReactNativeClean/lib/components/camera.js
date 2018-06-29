import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { RNCamera } from "react-native-camera";
import { Storage } from 'aws-amplify';

export class Camera extends React.Component {
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
        <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    ];
  }

  takePicture = function (camera) {
    if (camera) {
      camera.takePictureAsync({
        quality: 0.5,
        base64: true
      })
        .then(pic => fetch(pic.uri))
        .then(res => res.blob())
        .then(blob => {
          const key = 'pic-' + Date.now().toString() + '.jpg';

          return Storage.put(key, blob, {
            contentType: 'image/jpeg'
          });
        })
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    else {
      console.error('Camera not there');
    }
  }
}

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
