import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {Container, Button, Content, Icon} from 'native-base'
import { Jiro } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import createUser from '../actions/users-sessions/createUser'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




const screen = Dimensions.get('window');

class StepOne extends Component {

  state = {
    weight: '',
    height: '',
    age: '',
    gender: '',
  }

  nextPreprocess = () => {
      
  // Save step state for use in other steps of the wizard
  this.props.saveState(1, {...this.state})
 
  // Go to next step
  this.props.nextFn()
  }
   
  previousPreprocess = () => {
    this.props.prevFn()  
  }

  handleWeightChange = (weight) => {
    this.setState({weight})
  }

  handleHeightChange = (height) => {
    this.setState({height})
  }

  handleAgeChange = (age) => {
    this.setState({age})
  }

  handleGenderChange = (gender) => {
    console.log("GENDER GIVEN", gender)
    this.setState({gender: gender})
  }

  componentWillMount() {
    if (this.props.getState()[1]) {
      this.setState({...this.props.getState()[1]})
    }
  }



  render() {
    console.log("PROPS 2", this.props.getState())

    var radio_props = [
      {label: 'male', value: 0 },
      {label: 'female', value: 1 }
    ];

    onSelectedItemsChange = (selectedItems) => {
    // do something with selectedItems
    console.log(selectedItems);
    }

      return (
        <LinearGradient colors={['#e3b041', '#e3b041', '#e3b323']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Content style={{top: 50, height: screen.height}}>
          <View style={{alignSelf: 'center'}}>
          </View>
          <View style={{margin: 50, borderColor: '#000000', borderWidth: 2, padding: 20}}>
          <Text style={{alignSelf: 'center', fontFamily: 'Bayformance', fontSize: 48, fontWeight: 'bold', color: '#fd7273', backgroundColor: 'transparent'}}>Personal Info</Text>
             <Jiro
              label={'weight (lbs)'}
              // this is used as active and passive border color
              borderColor={'#8aaf84'}
              labelStyle={{fontWeight: '600', fontSize: 18, color: 'white'}}
              inputStyle={{ color: '#8234FF' }}
              onChangeText={this.handleWeightChange}
              value={this.state.weight}
            />
            <Jiro
              label={'height (in)'}
              // this is used as active and passive border color
              borderColor={'#8aaf84'}
              labelStyle={{fontWeight: '600', fontSize: 18, color: 'white'}}
              inputStyle={{ color: '#8234FF' }}
              onChangeText={this.handleHeightChange}
              value={this.state.height}
            />
            <Jiro
              label={'age'}
              // this is used as active and passive border color
              borderColor={'#8aaf84'}
              labelStyle={{fontWeight: '600', fontSize: 18, color: 'white'}}
              inputStyle={{ color: '#8234FF' }}
              onChangeText={this.handleAgeChange}
              value={this.state.age}
            />
              <RadioForm
                style={{flexDirection: 'row', justifyContent: 'space-between', margin: 30}}
                radio_props={radio_props}
                buttonColor={'#8234FF'}
                onPress={(gender) => this.handleGenderChange(gender)}
                initial={this.state.gender}
              />
          </View>
            <View style={styles.buttonContainer}>
              <Button block light style={styles.buttonLogin} onPress={this.previousPreprocess} >
                  <Icon name="ios-arrow-back" style={{color: 'white', justifyContent: 'center' }}/>
              </Button>
              <Button block light style={styles.button} onPress={this.nextPreprocess} >
                  <Icon name="ios-arrow-forward" style={{color: 'white', justifyContent: 'center' }}/>
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
  button: {
    backgroundColor: "#F46D6D",
    width: 100,
    height: 60,
    bottom: 20
  },
  buttonLogin: {
    backgroundColor: '#8234FF',
    width: 100,
    height: 60,
    bottom: 20
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
    createUser: (userInfo) => dispatch(createUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(StepOne)




