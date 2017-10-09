import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';


const screen = Dimensions.get('window');

export default class Picture extends Component {

  state = {
    listVisible: false
  }

  render() {
    return (
      <View style={{position: "relative", marginBottom: 1}}>
        <Image source={{uri: this.props.pictureUri}} style={styles.image} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: screen.height / 3,
    width: screen.width
  },
  fullScreen: {
    position: 'relative',
    height: screen.height,
    width: screen.width,
    backgroundColor: 'transparent'
  },
  visible: {
  },
  notVisible: {
    display: 'flex'
  }
})