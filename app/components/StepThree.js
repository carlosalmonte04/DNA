import React, { Component } from 'react';
import { connect } from 'react-redux'

import { View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {Container, Button, Content, Icon} from 'native-base'
import LinearGradient from 'react-native-linear-gradient';
import saveUserSignUpInfo from '../actions/users-sessions/saveUserSignUpInfo'


const screen = Dimensions.get('window');

class StepThree extends Component {

  nextPreprocess = () => {
    let finalState = {}
    this.props.getState().forEach(state => finalState = {...finalState, ...state} )
    this.props.saveUserSignUpInfo(finalState)

    this.props.nextFn()
  }
   
  previousPreprocess = () => {
    this.props.prevFn()
  }


  render() {
    console.log("NAVIGATE", this.props)
    var radio_props = [
      {label: 'male', value: 'male' },
      {label: 'female', value: 'female' }
    ];
      return (
        <LinearGradient colors={['#e3b041', '#e3b041', '#e3b323']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Content style={{top: 20, height: screen.height, }}>
          <View style={{margin: 50, borderColor: '#000000', borderWidth: 2, padding: 20}}>
          <Text style={{alignSelf: 'center', fontFamily: 'Bayformance', fontSize: 68, fontWeight: 'bold', color: '#fd7273', backgroundColor: 'transparent'}}>Review</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Goal:</Text>
              <Text style={styles.value}> {this.props.getState()[0].goal}</Text>
            </View>
            <View style={[styles.infoContainer, {flexDirection: 'column'}]}>
              <Text style={styles.title}>Health Condition/s:</Text>
              {this.props.getState()[0].healthConditions.map(condition => <Text key={condition.id} style={styles.value}>{condition.name}</Text>)}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Weight:</Text>
              <Text style={styles.value}> {this.props.getState()[1].weight} lbs</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Height:</Text>
              <Text style={styles.value}> {this.props.getState()[1].height} in</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Age: </Text>
              <Text style={styles.value}> {this.props.getState()[1].age}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>gender: </Text>
              <Text style={styles.value}> {this.props.getState()[1].gender === 1 ? "female" : "male"}</Text>
            </View>
          </View>
            <View style={styles.buttonContainer}>
              <Button block light style={styles.button} onPress={this.previousPreprocess} >
                  <Icon name="ios-arrow-back" style={{color: 'white', justifyContent: 'center' }}/>
              </Button>
              <Button block light style={styles.buttonProgress} onPress={this.nextPreprocess} >
                <Text style={{color: "white", fontWeight: '400', fontSize: 24, fontFamily: 'Bayformance'}}>looks good!</Text>
              </Button>
            </View>
            </Content>
          </LinearGradient>
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
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    color: '#8234FF',
    fontFamily: 'Bayformance',
    fontSize: 28,
  },
  value: {
    color: 'white',
    fontFamily: 'Bayformance',
    fontSize: 28,
    color: '#F46D6D'
  },
  button: {
    backgroundColor: "#F46D6D",
    width: 100,
    height: 60,
    bottom: 20,
  },
  buttonProgress: {
    backgroundColor: '#8234FF',
    width: 120,
    height: 60,
    bottom: 20,
    padding: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    marginLeft: 50,
    marginRight: 50,
  },
})

function mapDispatchToProps(dispatch) {
  return {
    saveUserSignUpInfo: (userInfo, callback) => dispatch(saveUserSignUpInfo(userInfo, callback)),
  }
}




export default connect(null, mapDispatchToProps)(StepThree)