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
import resetFoods from '../actions/foods/resetFoods'
import resetMeals from '../actions/meals/resetMeals'
import pictureOnAnalyser from '../actions/ui/pictureOnAnalyser'

class CameraDashboardContainer extends Component {

  isLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token')
    this.props.toggleLoggedIn(!!token)
    if (this.props.isLoggedIn) await this.props.fetchUser(token)
    this.props.setLoading(false)
  }

  resetAll = () => {
    this.props.resetFoods()
    this.props.resetMeals()
    this.props.retakePicture()
    this.props.navigation.navigate('CameraDashboardContainer')
  }

  _renderCameraDashboard = () => {
    return (
        <Camera navigation={this.props.navigation} resetAll={this.resetAll} />
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
    return(
        /*this.props.isLoggedIn*/ true ? this._renderCameraDashboard() : this._renderWelcomeLoginForm() 
      )
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
    saveMeal: (meal) => dispatch(saveMeal(meal)),
    setLoading: (bool) => dispatch(setLoading(bool)),
    fetchUser: (token) => dispatch(fetchUser(token)),
    retakePicture: () => dispatch(pictureOnAnalyser(null)),
    resetFoods: () => dispatch(resetFoods()),
    resetMeals: () => dispatch(resetMeals()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CameraDashboardContainer)