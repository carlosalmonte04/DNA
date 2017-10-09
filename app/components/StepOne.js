import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {Container, Button, Content, Icon} from 'native-base'
import { Jiro } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import createUser from '../actions/users-sessions/createUser'
import { Dropdown } from 'react-native-material-dropdown';
import MultiSelect from 'react-native-multiple-select';



const screen = Dimensions.get('window');

class StepOne extends Component {

  state = {
    goal: '',
    healthConditions: [],
  }

  nextPreprocess = () => {
  this.props.saveState(0,{...this.state})
  this.props.nextFn()
  }
   
  previousPreprocess = () => {
    this.props.prevFn()    
  }

  handleGoalChange = (goal) => {
    this.setState({goal}) 
  }

  handleConditionChange = (healthConditions) => {
    this.setState({healthConditions})
  }

  componentWillMount() {
    if (this.props.getState()[0]) {
      console.log("SETTING STATE")
      this.setState({...this.props.getState()[0]})
    }
  }

  render() {
    const goalData = [{
      value: 'Gain Weight',
    }, {
      value: 'Maintain Weight',
    }, {
      value: 'Lose Weight',
    }]
    const conditionsData = [{
      id: 'hypertension',
      name: 'Hypertension',
    }, {
      id: 'hyperlipidemia',
      name: 'Hyperlipidemia',
    }, {
      id: 'diabetes',
      name: 'Diabetes',
    }, {
      id: 'renalIssues',
      name: 'Renal issues',
    }];
      return (
        <LinearGradient colors={['#e3b041', '#e3b041', '#e3b323']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Content style={{top: 50, height: screen.height}}>
          <View style={{alignSelf: 'center'}}>
          </View>
          <View style={{margin: 50, borderColor: '#000000', borderWidth: 2, padding: 20}}>
          <Text style={{alignSelf: 'center', fontFamily: 'Bayformance', fontSize: 52, fontWeight: 'bold', color: '#fd7273', backgroundColor: 'transparent'}}> Health Info</Text>
          <Dropdown
            label='Goal'
            data={goalData}
            textColor={'#fd7273'}
            labelFontSize={18}
            baseColor={'#8234FF'}
            itemTextStyle={{fontSize: 28}}
            onChangeText={(goal) => this.handleGoalChange(goal)}
            value={this.state.goal}

          />
          <View style={{top: 20}}>
            <MultiSelect
              items={conditionsData}
              uniqueKey="id"
              onSelectedItemsChange={(selectedConditions) => this.handleConditionChange(selectedConditions)}
              selectedItems={this.state.healthConditions}
              selectText="Health conditions"
              fontFamily={'Bayformance'}
              searchInputPlaceholderText="search conditions..."
              tagRemoveIconColor="#8234FF"
              tagBorderColor="#8234FF"
              tagTextColor="#8234FF"
              selectedItemTextColor="#8234FF"
              selectedItemIconColor="#fd7273"
              itemTextColor="#fd7273"
              searchInputStyle={{ color: '#fd7273' }}
              submitButtonColor="#8234FF"
              submitButtonText="Submit"
            />
            </View>
          </View>
            <View style={styles.buttonContainer}>
              <Button block light style={styles.buttonLogin} onPress={this.nextPreprocess} >
                <Text style={{color: "white", fontWeight: '400', fontSize: 18, fontFamily: 'Bayformance'}}>Log In</Text>
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




