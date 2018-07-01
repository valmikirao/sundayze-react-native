import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import _ from 'lodash';
import { Storage } from 'aws-amplify';

import { styles, images } from '../styles/group-view-styles';
import { sdzConnect } from "../redux-utils";
import { Actions } from "../redux-reducer";
import { Camera } from "./camera";

class SharedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { imageSource : null };

    // Couldn't get S3Image to work, so doing this
    if (props.image) {
      Storage.get(props.image)
        .then(uri => this.setState({ imageSource: { uri } }));
    }
  }

  render () {
    const { note, time } = this.props;

    return  <View style={styles.sharedItem_view}>
      { this.state.imageSource && <Image
        source={ this.state.imageSource }
        style={ styles.sharedItem_image }
      /> }
      <Text> { note } as { time } </Text>
    </View>
  }
}

export const StreamOfSharedItems = sdzConnect({
  base : state => state.view,
  pick : ['sharedItems']
})(class extends React.Component {
  render() {
    const { sharedItems } = this.props;

    const data = sharedItems.map(
      item => _.pick(item, ['note', 'time', 'image'])
    );
    
    function renderItem({item}) {
      const { note, time, image } = item;
      return <SharedItem note={ note } time={ time } image={ image }/>
    }

    let key = 0;
    return <View style={ styles.sharedItemsList }><FlatList
      data={ data }
      renderItem={ renderItem }
      keyExtractor={ () => `${++key}` }
    /></View>
  }
});

const BottomBar = sdzConnect({
  dispatch : {
    openCamera : Actions.openCamera
  }
})(class extends React.Component {
  render() {
    const { openCamera } = this.props;

    return <View style={ styles.bottomBar }>
      <TouchableOpacity onPress={ openCamera }>
        <Image style={ styles.bottomBar_takePicImage } source={ images.takePic }/>
      </TouchableOpacity>
      <Image style={ styles.bottomBar_writeNoteImage } source={ images.writeNote }/>
    </View>
  }
});

export const GroupView = sdzConnect({
  base : state => state.view,
  pick : ['cameraActive'],
})(class extends React.Component {

  render() {
    if (!this.props.cameraActive) {
      return <View style={ styles.groupView }>
        <StreamOfSharedItems />,
        <BottomBar/>
      </View>;
    }
    else {
      return <Camera/>;
    }
  }

});
