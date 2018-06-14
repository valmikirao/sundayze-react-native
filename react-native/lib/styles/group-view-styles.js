import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sharedItem_image : {
      width: 300,
      height: 400
  },
  sharedItem_view : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBar: {
    // position: "absolute",
    // bottom: 0,
    // right: 0,
    // left: 0,
    height: 50,
    width: '100%',
    opacity: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue"
  },
  bottomBar_takePicImage: {
    height: 30,
    width: 30
  },
  bottomBar_writeNoteImage: {
    height: 30,
    width: 30
  }
});

export const images = {
  takePicImage: require('../../src-assets/camera.png'),
  writeNoteImage: require('../../src-assets/pencil.png')
}