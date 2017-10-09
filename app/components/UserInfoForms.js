import React, {Component} from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Navigator, Image, View, Link, Dimensions, FlatList, ScrollView, Easing } from 'react-native';
import MultiStep from 'react-native-multistep-wizard'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import Assessment from './Assessment'
import saveUserSignUpInfo from '../actions/users-sessions/saveUserSignUpInfo'
import setLoading from '../actions/ui/setLoading'

 
/* Define the steps of multistep wizard */
 
 
/* Define your class */
class UserInfoForms extends Component{
 
	finish = (wizardState) => {
    let userInfo = {}
    wizardState.forEach(state => userInfo = {...userInfo, ...state})
    this.props.setLoading(true)
    this.props.navigation.navigate('CameraDashboardContainer')
    }

  steps = () => {
    const steps = [
                {name: 'StepOne', component: <StepOne />},
                {name: 'StepTwo', component: <StepTwo />},
                {name: 'StepThree', component: <StepThree navigate={this.props.navigation.navigate}/>},
                {name: 'Assessment', component: <Assessment />},
              ];
    return steps
    }
 
	/* render MultiStep */
	render(){
    return(
        <View>
        <MultiStep steps={this.steps()} onFinish={this.finish}/>
        </View>
    )
	}
}

function mapDispatchToProps(dispatch) {
  return {
    saveUserSignUpInfo: (userInfo, callback) => dispatch(saveUserSignUpInfo(userInfo, callback)),
    setLoading: (bool) => dispatch(setLoading(bool))
  }
}

function mapStateToProps(state) {
  return {
    signUpFormCompleted: state.ui.signUpFormCompleted,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoForms)

