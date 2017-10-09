import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {Container, Button, Content} from 'native-base'
import { Jiro } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import createUser from '../actions/users-sessions/createUser'



const screen = Dimensions.get('window');

class SignUpForm extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    message: '',
    userCreated: false
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.userCreated) {
      this.props.navigation.navigate('UserInfoForms')
    }
  }

  handleUsernameChange = (username) => {
    this.setState({username})
  }

  handlePasswordChange = (password) => {

    this.setState({password})

  }

  handlePasswordConfChange = (passwordConfirmation) => {
    this.setState({passwordConfirmation})
  }

  handleSubmit = () => {
    if (false) {
      this.setState({
        message: 'passwords do not match'
      })
    }
    else {
      this.props.createUser({...this.state}).then(user => { if (user) this.setState({userCreated: true})})
    }
  }

  render() {
      return (
        <LinearGradient colors={['#8234FF', '#8234FF', '#6b2ad6']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Content style={{top: 50, height: screen.height}}>
          <Image source={require('../assets/img/downArrow.png')} style={{alignSelf: 'center'}}/>
          <View style={{margin: 50, borderColor: '#000000', borderWidth: 2, padding: 20}}>
          <Text style={{alignSelf: 'center', fontFamily: 'Bayformance', fontSize: 68, fontWeight: 'bold', color: '#fd7273', backgroundColor: 'transparent'}}> Sign Up</Text>
            <Jiro
              label={'username'}
              // this is used as active and passive border color
              borderColor={'#e3b041'}
              labelStyle={{fontWeight: '100', fontSize: 18, color: 'white'}}
              inputStyle={{ color: 'white' }}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.handleUsernameChange}
              value={this.state.username}
            />
             <Jiro
              label={'password'}
              // this is used as active and passive border color
              borderColor={'#8aaf84'}
              labelStyle={{fontWeight: '100', fontSize: 18, color: 'white'}}
              inputStyle={{ color: 'white' }}
              secureTextEntry={true}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}

            />
             <Jiro
              label={'confirm password'}
              // this is used as active and passive border color
              borderColor={'#8aaf84'}
              labelStyle={{fontWeight: '100', fontSize: 18, color: 'white'}}
              inputStyle={{ color: 'white' }}
              secureTextEntry={true}
              onChangeText={this.handlePasswordConfChange}
              value={this.state.passwordConfirmation}
            />
          </View>
            <View style={styles.buttonContainer}>
              <Button block light style={styles.button} onPress={this.handleSubmit} >
                <Text style={{color: "white", fontWeight: '400', fontSize: 18}}>Sign Up</Text>
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
    width: 200,
    height: 60,
    bottom: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
})

function mapDispatchToProps(dispatch) {
  return {
    createUser: (userInfo) => dispatch(createUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(SignUpForm)




