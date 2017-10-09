import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Navigator, Image, View, Link, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, InputGroup, Input, Icon, Button, Text, Form, Header, Title, Item, Label} from 'native-base';
import { Jiro } from 'react-native-textinput-effects';
import toggleSignUpModal from '../actions/ui/toggleSignUpModal'
import Modal from 'react-native-modalbox';
import SignUpForm from './SignUpForm'
import login from '../actions/users-sessions/login'
import LinearGradient from 'react-native-linear-gradient';



const { width, height } = Dimensions.get('window')

class WelcomeLoginForm extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    this.props.login({...this.state})
  }

  handleSignUpPress = () => {
    this.props.toggleSignUpModal()
  }

  handleUsernameChange = (username) => {
    this.setState({username: username})
  }

  handlePasswordChange = (password) => {
    this.setState({password: password})
  }

  render() {
    return (
      <Container>
        <LinearGradient colors={['#F46D6D', '#F46D6D', '#F67272']} style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <View style={{position: 'absolute', alignSelf: 'center'}}>
            <Image source={require('../assets/img/logo.png')}  style={{position: 'absolute', flex: 1, alignSelf: 'center', top: 85}} resizeMode={"cover"}/>
          </View>
            <Form style={styles.form}>
              <Jiro
                label={'username'}
                // this is used as active and passive border color
                borderColor={'#e3b041'}
                labelStyle={{fontWeight: '600', fontSize: 18, color: 'white'}}
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
                labelStyle={{fontWeight: '600', fontSize: 18, color: 'white'}}
                inputStyle={{ color: 'white' }}
                secureTextEntry={true}
                onChangeText={this.handlePasswordChange}
                value={this.state.password}
              />
    
              <View style={{alignSelf: 'flex-end', margin: 10}}>
                <Text style={styles.link}>Forgot password</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button block light onPress={this.handleSubmit} style={styles.button} >
                  <Text style={{color: "white", fontWeight: '400', fontSize: 18, shadowColor: 'black', shadowOpacity: 0.5, shadowRadius: 1, shadowOffset: { height: 1, width: 1}}}>Log In</Text>
                </Button>
              </View>
               <View style={{alignSelf: 'center', margin: 10, flexDirection: 'row'}}>
                <Text style={{color: "#E2E2E2", backgroundColor: 'transparent'}}>Not signed up yet?&nbsp;</Text>
                  <TouchableOpacity onPress={this.handleSignUpPress}>
                    <Text style={styles.link}>Sign Up</Text>
                  </TouchableOpacity>
              </View>
            </Form>
        </LinearGradient>
        <Modal
          ref={"signUpModal"}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={this.props.toggleSignUpModal}
          isOpen={!!this.props.signUpShowing}
          >
            <SignUpForm navigation={this.props.navigation}/>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    marginBottom: 10,
    color: '#595856'
  },
  logo: {
    height: "30%",
    width: "80%",
    position: "relative",
    left: 43,
    top: 20,
  },
  bg: {
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: "relative",
    top: 100
  },
  form: {
    position: "relative",
    top: 300,
    width: "80%",
    alignSelf: 'center',
  },
  input: {
    backgroundColor: "transparent",
    borderColor:'white',
    marginTop: 10
  },
  button: {
    backgroundColor: "#8234ff",
    width: 300,
    height: 60,
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 10
  },
  link: {
    color: "#8234ff",
    fontWeight: '500',
    backgroundColor: 'transparent',
  }
})

function mapDispatchToProps(dispatch) {
  return {
    toggleSignUpModal: () => dispatch(toggleSignUpModal()),
    login: (userInfo) => dispatch(login(userInfo))
  }
}

function mapStateToProps(state) {
  return {
    signUpShowing: state.ui.signUpModalShowing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLoginForm)