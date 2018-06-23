import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import _ from 'lodash';

import { styles, images } from '../styles/group-view-styles';
import { sdzConnect } from "../redux-utils";

class SharedItem extends React.Component {
  render () {
    let key = 0;

    const { note, pic, key_ } = this.props;
    
    return  <View key={ key_ } style={styles.sharedItem_view}>
        <Image
          key={ ++key }
          style={ styles.sharedItem_image }
          source={ pic }
        />
        <Text key={ ++key }>{note}</Text>
    </View>
  }
}

export const StreamOfSharedItems = sdzConnect({
  base : state => state,
  pick : ['sharedItems']
})(class extends React.Component {
  render() {
    let key = 0;
    const { sharedItems } = this.props;
    const { key_ } = this.props
    // const { sharedItems } = this.props;
    
    const data = sharedItems.map(
      item => _.pick(item, ['note', 'time', 'pic'])
    );
    
    function renderItem({item}) {
      const { note, time, pic } = item;
      return <SharedItem key_={ ++key } note={ note } time={ time } pic={ pic }/>
    }
    
    return <FlatList key={ key_ } style={ styles.sharedItemsList }
      data={ data }
      renderItem={ renderItem }
    />
  }
})

function _debugAlert() {
    Alert.alert('Hello','World');
}

class BottomBar extends React.Component {
  render() {
    let key = 0;
    const { key_ } = this.props

    return <View key={ key_ } style={ styles.bottomBar }>
      <TouchableOpacity onPress={ _debugAlert }>
        <Image key={ ++key } style={ styles.bottomBar_takePicImage } source={ images.takePic }/>
      </TouchableOpacity>
      <Image key={ ++key } style={ styles.bottomBar_writeNoteImage } source={ images.writeNote }/>
    </View>
  }
}

export class GroupView extends React.Component {

  render() {
    let key = 0;

    return <View>
      <StreamOfSharedItems key_={ ++key }/>
      <BottomBar key_={ ++key }/>
    </View>;
  }
}
