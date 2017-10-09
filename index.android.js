/**
 * Sample React Native DNA
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import { StackNavigator } from 'react-navigation'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { connect } from 'react-redux'

import foodsReducer from './app/reducers/foodsReducer'
import mealsReducer from './app/reducers/mealsReducer'
import uiReducer from './app/reducers/uiReducer'
import usersReducer from './app/reducers/usersReducer'

import AppNavigator from './app/components/AppNavigator'

const { width, height } = Dimensions.get('window')

// polyfill to fix clarifai error
if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;

const rootReducer = combineReducers({foods: foodsReducer, ui: uiReducer, meals: mealsReducer, user: usersReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))

class DNA extends Component {

  render() {
    return (
      <Provider store={store} style={styles.main}>
        <AppNavigator style={{position: 'relative'}}/>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    height: height,
    width: width 
  }
})

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: (token) => dispatch(fetchUser(token))
  }
} 

export default connect(null, mapDispatchToProps)(DNA)

AppRegistry.registerComponent('DNA', () => DNA);