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
import { Storage, Auth } from 'aws-amplify';

import { styles, images } from '../styles/group-view-styles';
import { sdzConnect } from "../redux-utils";
import { Actions } from "../redux-reducer";
import { Camera } from "./camera";

class SharedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSource : null,
      mounted : false
    };

    // Couldn't get S3Image to work, so doing this
    if (props.image) {
      Storage.get(props.image)
        .then(uri => {
          const newState = {
            ...this.state,
            imageSource: { uri }
          };

          // ugh, only want to call setState if this is mounted
          if (this.state.mounted) {
            this.setState(newState);
          }
          else {
            this.state = newState;
          }
        });
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      mounted : true
    })
  }

  componentWillUnmount() {
    this.state = {
      ...this.state,
      mounted : false
    };
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
    const { sharedItems = [] } = this.props;

    const data = sharedItems.map(
      item => _.pick(item, ['note', 'time', 'image'])
    );
    
    function renderItem({item}) {
      const { note, time, image } = item;
      return <SharedItem note={ note } time={ time } image={ image }/>
    }

    let key = 0;
    return <View style={ styles.sharedItemsList }><FlatList
      data={ data }ut
      renderItem={ renderItem }
      keyExtractor={ () => `${++key}` }
    /></View>
  }
});

const BottomBar = sdzConnect({
  dispatch : {
    openCamera : Actions.openCamera,
    init: Actions.init
  }
})(class extends React.Component {
  render() {
    const dispatch = _.pick(this.props, ['openCamera', 'init']);

    const signOut = () => {
      Auth.signOut();
    };

    return <View style={ styles.bottomBar }>
      <TouchableOpacity onPress={ dispatch.openCamera }>
        <Image style={ styles.bottomBar_takePicImage } source={ images.takePic }/>
      </TouchableOpacity>
      <Image style={ styles.bottomBar_writeNoteImage } source={ images.writeNote }/>
      <TouchableOpacity onPress={ signOut }>
        <Image style={ styles.bottomBar_signOutImage } source={ images.signOut }/>
      </TouchableOpacity>
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
