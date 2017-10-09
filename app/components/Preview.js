import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, Easing, StatusBar} from 'react-native';
import { Icon, Text, Label, Button, Content, Container} from 'native-base';
import { connect } from 'react-redux'
import Counter from 'react-native-counter';

import * as Animatable from 'react-native-animatable';
import { BlurView } from 'react-native-blur';
import * as Progress from 'react-native-progress';

const screen = Dimensions.get('window');

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
      <View style={styles.countersContainer}>
        <View style={styles.macroContainer}>
          <Icon name="ios-flame-outline" style={[styles.icon, {color: '#e6102b', top: 10}]}/>
          <Text style={[styles.macro, styles.calorie]}> {this.props.macros.calorie}</Text>
          <Label style={[styles.calorie, styles.label]}>Calories</Label> 
        </View>
        <View style={styles.macroContainer}>
          <Icon name="md-ionic" style={[styles.icon, {color: '#2357e4', top: 10}]}/>
          <Text style={[styles.macro, styles.protein]}> {this.props.macros.protein}</Text>
          <Label style={[styles.protein, styles.label]}>Protein</Label> 
        </View>
        <View style={styles.macroContainer}>
          <Icon name="ios-flower-outline" style={[styles.icon, {color: '#e6a620', top: 10}]}/>
          <Text style={[styles.macro, styles.fat]}> {this.props.macros.fat}</Text>
          <Label style={[styles.fat, styles.label]}>Fat</Label> 
        </View>
        <View style={styles.macroContainer}>
          <Icon name="ios-ice-cream-outline" style={[styles.icon, {color: '#e511e2', top: 10}]}/>
          <Text style={[styles.macro, styles.carbohydrate]}> {this.props.macros.carbohydrate}</Text>
          <Label style={[styles.carbohydrate, styles.label]}>carbohydrates</Label> 
        </View>
      </View>
    )
  }

  _renderCounters = () => {
    return (
      <View style={styles.countersContainer}>
        <View style={styles.macroContainer}>
          <Icon name="ios-flame-outline" style={[styles.icon, {color: '#e6102b', top: 10}]}/>
          <Counter end={this.props.macros.calorie} start={this.calorieBefore || 0} time={1000} countBy={10} style={[styles.macro, styles.calorie]}/> 
          <Label style={[styles.calorie, styles.label]}>Calories</Label> 
        </View>
        <View style={styles.macroContainer}>
          <Icon name="md-ionic" style={[styles.icon, {color: '#2357e4', top: 10}]}/>
          <Counter end={this.props.macros.protein} start={this.proteinBefore || 0} time={1000} countBy={10} style={[styles.macro, styles.protein]} /> 
          <Label style={[styles.protein, styles.label]}>Protein</Label> 
        </View>
        <View style={styles.macroContainer}>
          <Icon name="ios-flower-outline" style={[styles.icon, {color: '#e6a620', top: 10}]}/>
          <Counter end={this.props.macros.fat} start={this.fatBefore || 0} time={1000} countBy={10} style={[styles.macro, styles.fat]} /> 
          <Label style={[styles.fat, styles.label]}>Fat</Label> 
        </View>
        <View style={styles.macroContainer}>
          <Icon name="ios-ice-cream-outline" style={[styles.icon, {color: '#e511e2', top: 10}]}/>
          <Counter end={this.props.macros.carbohydrate} start={this.carbohydrateBefore || 0} time={1000} countBy={10} style={[styles.macro, styles.carbohydrate]} onComplete={this.handleCounterComplete} /> 
          <Label style={[styles.carbohydrate, styles.label]}>carbohydrates</Label> 
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
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', }}>
          <StatusBar hidden={false} style={{position: 'relative'}} />
          <View style={{alignSelf: 'center', flexDirection: 'row', borderColor: 'black', borderWidth: 8, padding: 10, width: "100%", flexWrap: 'wrap', marginTop: 20}}>

            <TouchableOpacity style={{position: "relative", marginBottom: 1}} onPress={this.handlePress}>
              <Image source={{uri: this.props.pictureUri}} style={styles.image} />
            </TouchableOpacity>
          </View>
        <Animatable.View animation="fadeIn" duration={500} style={[styles.counterContainer]}>
            <Container style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "80%", alignSelf: 'center', borderWidth: 6, borderColor: '#2a555e', backgroundColor: 'white'}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.header}>Totals</Text>
              </View>
              {this.state.countersComplete ? this._renderPlainTexts() : this._renderCounters()}
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
               <Button block light onPress={this.handleRetake} style={[styles.button, {alignSelf: 'flex-end', backgroundColor: '#E3B041'}]} >
                  <Text style={{color: "white", fontFamily: 'Bayformance', fontSize: 24, textAlign: 'center'}}>retake</Text>
                </Button>
            <Button block light onPress={this.handleButtonPress} style={[styles.button]} >
                  <Text style={{color: "white", fontFamily: 'Bayformance', fontSize: 24, textAlign: 'center'}}>Save</Text>
                </Button>
            </View>
          </Container>

        </Animatable.View>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <StatusBar hidden={false} style={{position: 'relative'}} />
          <View style={{alignSelf: 'center', flexDirection: 'row', borderColor: 'black', borderWidth: 8, padding: 10, width: "100%", flexWrap: 'wrap', marginTop: 20, backgroundColor: '#5b25b3'}}>

          <TouchableOpacity style={{position: "relative", marginBottom: 1}} onPress={this.handleRetake}>
            <Image source={{uri: this.props.pictureUri}} style={styles.image} resizeMode={"cover"}/>
          </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  image: {
    height: screen.height / 3,
    width: screen.width / 1.1,
    backgroundColor: 'transparent'
  },
  header: {
    fontSize: 56,
    alignSelf: 'center',
    fontFamily: 'Bayformance',
    color: '#8234FF',
    backgroundColor: 'transparent'
  },
  counterContainer: {
    height: screen.height / 3.5,
    width: screen.width,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 60
  },
  icon: {
    opacity: 0
  },
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: "#8234ff",
    height: 40,
    width: 90,
    margin: 10
  },
  countersContainer: {flex: 1, justifyContent: 'space-between', flexDirection: 'row', bottom: 20 },
  macroContainer: {justifyContent: 'center', alignItems: 'center', top: 2},
  macro: {fontFamily: 'Bayformance'},
  label: {fontSize: 16, fontFamily: 'Bayformance', bottom: 10},
  calorie: {fontSize: 46, color: '#2a555e'},
  protein: {fontSize: 46, color: '#2a555e'},
  fat: {fontSize: 46, color: '#2a555e'},
  carbohydrate: {fontSize: 46, color: '#2a555e'},
})