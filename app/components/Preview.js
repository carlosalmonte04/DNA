import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Easing, StatusBar} from 'react-native';
import { Icon, Text, Label, Button, Content, Container} from 'native-base';
import { connect } from 'react-redux'
import Counter from 'react-native-counter';

import * as Animatable from 'react-native-animatable';
import { BlurView } from 'react-native-blur';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

export default class Preview extends Component {

  handleRetake = () => {
    Alert.alert(
      'Retake Picture',
      'Unsaved results will be permanently erased.',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: this.props.resetAll},
      ],
      { cancelable: true }
    )
  }

  state = {
    countersComplete: false
  }

  handleButtonPress = () => {
    this.props.handleSave()
  }

  handleCounterComplete = () => {
    this.setState({countersComplete: true})
  }

  _renderPlainTexts = () => {
    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>Calories</Label> 
            <Text style={styles.macro}><Icon name="ios-flame-outline" style={[styles.icon, {color: '#686d6f'}]}/> {this.props.macros.calorie}</Text>
          </View>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>Protein</Label> 
            <Text style={styles.macro}><Icon name="md-ionic" style={[styles.icon, {color: '#686d6f'}]}/> {this .props.macros.protein}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>Fat</Label> 
            <Text style={styles.macro}><Icon name="ios-flower-outline" style={[styles.icon, {color: '#686d6f'}]}/> {this.props.macros.fat}</Text>
          </View>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>carbs</Label> 
            <Text style={styles.macro}><Icon name="ios-ice-cream-outline" style={[styles.icon, {color: '#686d6f'}]}/> {this.props.macros.carbohydrate}</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderCounters = () => {
    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>Calories</Label> 
            <Text style={styles.macro}>
              <Icon name="ios-flame-outline" style={[styles.icon, {color: '#686d6f'}]}/> <Counter end={this.props.macros.calorie} start={this.calorieBefore || 0} time={1000} countBy={10} />
            </Text>
          </View>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>Protein</Label> 
            <Text style={styles.macro}>
              <Icon name="md-ionic" style={[styles.icon, {color: '#686d6f'}]}/> <Counter end={this.props.macros.protein} start={this.proteinBefore || 0} time={1000} countBy={10} />
            </Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>Fat</Label> 
            <Text style={styles.macro}>
              <Icon name="ios-flower-outline" style={[styles.icon, {color: '#686d6f'}]}/> <Counter end={this.props.macros.fat} start={this.fatBefore || 0} time={1000} countBy={10} />
            </Text>
          </View>
          <View style={styles.macroContainer}>
            <Label style={styles.label}>carbs</Label> 
            <Text style={styles.macro}>
              <Icon name="ios-ice-cream-outline" style={[styles.icon, {color: '#686d6f'}]}/> <Counter end={this.props.macros.carbohydrate} start={this.carbohydrateBefore || 0} time={1000} countBy={10} onComplete={this.handleCounterComplete} />
            </Text>
          </View>
        </View>
      </View>
    )
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.macros.calorie !== nextProps.macros.calorie) { this.calorieBefore = this.props.macros.calorie; this.setState({countersComplete: false}) }
      if (this.props.macros.protein !== nextProps.macros.protein) { this.proteinBefore = this.props.macros.protein; this.setState({countersComplete: false}) }
      if (this.props.macros.fat !== nextProps.macros.fat) { this.fatBefore = this.props.macros.fat; this.setState({countersComplete: false}) }
      if (this.props.macros.carbohydrate !== nextProps.macros.carbohydrate) { this.carbohydrateBefore = this.props.macros.carbohydrate; this.setState({countersComplete: false}) }
  }

  render() {
    if (this.props.previewVisible) {
      return (
        <View>
          <StatusBar hidden={false} style={{position: 'relative'}} />
          <View style={{justifyContent: 'center', backgroundColor: 'transparent', height: "100%"}}>
            <Image source={{uri: this.props.pictureUri}} style={styles.image} />
            <View style={[styles.boxContainer, styles.shadow]}>
              {this.state.countersComplete ? this._renderPlainTexts() : this._renderCounters()}
              <View style={[styles.buttonsContainer]}>
                <Button block light onPress={this.handleRetake} style={[styles.button, {alignSelf: 'flex-end', backgroundColor: '#e4c271', width: 90}]} >
                  <Text style={styles.buttonText}>retake</Text>
                </Button>
                <Button block light onPress={this.handleButtonPress} style={[styles.button, {alignSelf: 'flex-end'}]} >
                  <Text style={styles.buttonText}>Save</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity style={styles.image}  onPress={this.handleRetake}>
          <Image source={{uri: this.props.pictureUri}} style={styles.image}/>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    flex: 0.65,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e4c271',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "75%",
  },
  row: {
    flex: 1.7,
    flexDirection: 'row',
    top: 25,
    width: '77%',
    alignSelf: 'center'
  },
  column: {
    flex: 0.5,
    flexDirection: 'column',
    marginLeft: 10
  },
  macroContainer: {
    flex: 0.5,
    alignItems: 'flex-start',
  },
  icon: {
    flex: 0.5,
    top: 40
  },
  macro: {
    flex: 0.5,
    fontSize: 32,
    fontWeight: '300'
  },
  label: {
    flex: 0.2,
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: -1,
      height: 1
    },
  },
  buttonsContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: "#8cba92",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: -1,
      height: 3
    },
    height: 40,
    width: 90,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: 'center'
  },
  image: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    zIndex: -1,
  },
})