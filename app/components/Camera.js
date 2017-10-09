import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet, StatusBar } from 'react-native';
import {Container, Header, Left, Body, Right, Button, Icon, Title, InputGroup, Input, Label, Item} from 'native-base'

import Camera from 'react-native-camera';
import { connect } from 'react-redux'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import startAnalyser from '../actions/ui/startAnalyser'

const screen = Dimensions.get('window');

class CameraScreen extends Component {

  state ={
    hasCameraPermission: null,
  }

  takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then(picture => {
        this.props.startAnalyser(picture.path)
        this.props.navigation.navigate('ResultsContainer')
      })
      .catch(err => console.error(err));
  }

 
  render() {
    return (
      <Container>
        <StatusBar hidden={true} />
        <Camera
          ref={(cam) => {this.camera = cam;}}
          style={{flex: 1}}
          aspect={Camera.constants.Aspect.fill}
          mirrorImage={false}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality="medium">
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.takePicture} style={{flexDirection: 'column', top: 210}}>
            <Image source={require("../assets/img/cameraShutter.png")} style={{bottom: 5, alignSelf: 'flex-end'}}/>
          </TouchableOpacity>
          </View>
        </Camera>
        <View style={{position: 'absolute', width: "100%", flex: 1, flexDirection: "row", alignItems: 'flex-start'}}>
          <InputGroup style={{left: 10}}>
          <Item>
          <Icon name='search' style={{fontSize: 28, color: 'white', alignSelf: 'center', marginLeft: 10}} />
            <Input placeholder="Search meal" placeholderTextColor={"#bdbdbd"} style={{fontSize: 22, color: 'white'}} />
          </Item>
            </InputGroup>
        </View>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});


function mapStateToProps(state) {
  return {
     foods: state.foods,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startAnalyser: (picturePath) => {
        dispatch(startAnalyser(picturePath))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)


