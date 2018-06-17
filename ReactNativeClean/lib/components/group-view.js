import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, View, Button, AppRegistry, FlatList, Image } from 'react-native';
import _ from 'lodash';

import { styles, images } from '../styles/group-view-styles';

class SharedItem extends React.Component {
  render () {
    const {note, time, pic } = this.props;
    
    return  <View style={styles.sharedItem_view}>
        <Image
          style={ styles.sharedItem_image }
          source={ pic }
        />
        <Text>{note}</Text>
    </View>
  }
}

class _StreamOfSharedItems extends React.Component {
  render() {
    let key = 0;
    const { sharedItems } = this.props.redux;
    // const { sharedItems } = this.props;
    
    const data = sharedItems.map(
      item => _.pick(item, ['note', 'time', 'pic'])
    );
    
    function renderItem({item}) {
      const {note, time, pic} = item;
      return <SharedItem note={ note } time={ time } pic={ pic }/>
    }
    
    return <FlatList 
      data={ data }
      renderItem={ renderItem }
    />
  }
}

class BottomBar extends React.Component {
  render() {
    return <View style={styles.bottomBar}>
      <Image style={styles.bottomBar_takePicImage} source={ images.takePicImage }/>
      <Image style={styles.bottomBar_writeNoteImage} source={ images.writeNoteImage }/>
    </View>
  }
}

export const StreamOfSharedItems = connect(
  (state, ownProps) => ({
    redux: { sharedItems: state.sharedItems }
  })
)(_StreamOfSharedItems)

export class GroupView extends React.Component {
  render() {
    return <View>
      <StreamOfSharedItems/>
      <BottomBar/>
    </View>;
  }
}
