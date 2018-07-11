import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sharedItem_image : {
    width: 300,
    height: 400,
    margin: 3
  },
  sharedItem_view : {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
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
    justifyContent: "space-around",
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
  },
  bottomBar_signOutImage: {
    height: 30,
    width: 30
  },
  sharedItemsList: {
    flex: 1
  },
  groupView: {
    flex: 1
  }
});

export const images = {
  takePic: require('../../src-assets/camera.png'),
  writeNote: require('../../src-assets/pencil.png'),
  signOut: require('../../src-assets/sign_out.png')
}