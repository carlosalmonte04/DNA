import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const screen = Dimensions.get('window')

export default class FullScreenLoader extends Component {

	render() {
		return (
			<Animatable.View  animation="fadeIn" title="hello" style={styles.container}>
				<Image source={require('../assets/img/loading.gif')} style={{width: screen.width, height: screen.height - 230, top: 0}} />
      </Animatable.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		height: screen.height,
		width: screen.width
	}
})