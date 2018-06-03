import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { Container} from 'native-base';
import Modal from 'react-native-modalbox';
import toggleLoggedIn from '../actions/ui/toggleLoggedIn';
import fetchUser from '../actions/users-sessions/fetchUser';
import CameraDashboardContainer from './CameraDashboardContainer';
import ResultsContainer from './ResultsContainer';
import FullScreenLoader from './FullScreenLoader';
import WelcomeLoginForm from './WelcomeLoginForm';
import Assessment from './Assessment';

const screen = Dimensions.get('window');

class NutrientsAnalyser extends Component {

  state = {
    checkedLoggedInStatus: false
  }

  render() {
    if (this.state.checkedLoggedInStatus && !this.props.isLoggedIn) {
      return (
        <WelcomeLoginForm navigation={this.props.navigation}/>
      )
    }
    else if (this.state.checkedLoggedInStatus && this.props.isLoggedIn) {
      return (
        <Container style={{height: screen.height, position: 'relative'}}>
          {!this.props.pictureOnAnalyser ? <CameraDashboardContainer navigation={this.props.navigation}/> : <ResultsContainer navigation={this.props.navigation}/> }
        </Container>
      )
    }
    else {
      return <FullScreenLoader />
    }
  }
}

function mapStateToProps(state) {
  return {
    pictureOnAnalyser: state.ui.pictureOnAnalyser,
    loading: state.ui.isLoading,
    foods: state.foods,
    isLoggedIn: state.ui.isLoggedIn,
    signUpFormCompleted: state.ui.signUpFormCompleted,
    user: state.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLoggedIn: (bool) => dispatch(toggleLoggedIn(bool)),
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NutrientsAnalyser)