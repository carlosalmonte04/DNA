import React, { Component } from 'react';
import Camera from './Camera'
import { connect } from 'react-redux'
import DashboardContainer from './DashboardContainer'
import { AsyncStorage } from 'react-native'
import toggleLoggedIn from '../actions/ui/toggleLoggedIn';
import setLoading from '../actions/ui/setLoading';
import fetchUser from '../actions/users-sessions/fetchUser';
import SwipeALot from 'react-native-swipe-a-lot'
import WelcomeLoginForm from './WelcomeLoginForm'
import FullScreenLoader from './FullScreenLoader'

class CameraDashboardContainer extends Component {

  isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token')
    this.props.toggleLoggedIn(!!token)
    if (this.props.isLoggedIn) await this.props.fetchUser(token)
    this.props.setLoading(false)
  }

  _renderCameraDashboard() {
    return (
      <SwipeALot
        circleDefaultStyle={{opacity: 0}}
        circleActiveStyle={{opacity: 0}}
      >
        <Camera navigation={this.props.navigation} />
        <DashboardContainer navigation={this.props.navigation} />
      </SwipeALot>
    )
  }

  _renderWelcomeLoginForm() {
    return (
      <WelcomeLoginForm navigation={this.props.navigation} />
    ) 
  }

  componentDidMount() {
    this.isLoggedIn()
  }

  render() {
    if (this.props.isLoading) {
      return (
        <FullScreenLoader />
      )
    }
    else {
      return ( 
        this.props.isLoggedIn ? this._renderCameraDashboard() : this._renderWelcomeLoginForm() 
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.ui.isLoading,
    isLoggedIn: state.ui.isLoggedIn,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    toggleLoggedIn: (bool) => dispatch(toggleLoggedIn(bool)),
    setLoading: (bool) => dispatch(setLoading(bool)),
    fetchUser: (token) => dispatch(fetchUser(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraDashboardContainer)