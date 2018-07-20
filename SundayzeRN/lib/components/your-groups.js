import React from 'react';
import {
  View,
  Text
} from 'react-native';

import { styles, images } from '../styles/your-groups';

export const YourGroups = class extends React.Component {
  render () {
    return <View style={ styles.yourGroups }>
      <Text style={{width : 300}}>Your Groups Go Here</Text>
    </View>
  }
};