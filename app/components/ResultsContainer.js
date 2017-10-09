import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux'
import { List, ListItem, Button, ListView } from 'native-base'
import * as Animatable from 'react-native-animatable';
import saveMeal from '../actions/meals/saveMeal'
import Picture from './Picture'
import FullScreenLoader from './FullScreenLoader'
import Results from './Results'
import Review from './Review'
import Preview from './Preview'
import setLoading from '../actions/ui/setLoading'
import resetFoods from '../actions/foods/resetFoods'
import resetMeals from '../actions/meals/resetMeals'
import pictureOnAnalyser from '../actions/ui/pictureOnAnalyser'

const screen = Dimensions.get('window');


class ResultsContainer extends Component {

  state = {
      calorie      : this.props.macros.calorie,
      protein      : this.props.macros.protein,
      fat          : this.props.macros.fat,
      carbohydrate : this.props.macros.carbohydrate,
  }

  resetAll = () => {
    this.props.resetFoods()
    this.props.resetMeals()
    this.props.retakePicture()
    this.props.navigation.navigate('CameraDashboardContainer')
  }

  handleSave = async () => {
    this.props.saveMeal(this.props.meal)
    .then(() => { 
      this.props.navigation.navigate('CameraDashboardContainer')
      this.props.resetFoods()
      this.props.resetMeals()
    })
  }

  render() {
    return (
      <View style={{position: 'absolute' }}>
        { this.props.pictureUri ? <Preview {...this.props} handleSave={this.handleSave} resetAll={this.resetAll}/> : null }
        { !this.props.isLoading ? <Results meal={this.props.meal} foods={this.props.foods}/> : <FullScreenLoader />  }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: screen.height / 3,
    width: screen.width,
  },
  fullScreen: {
    position: 'relative',
    height: screen.height,
    width: screen.width,
    backgroundColor: 'transparent'
  },
  notVisible: {
    display: 'flex'
  }
})

function mapStateToProps(state) {
  return {
    previewVisible: state.meals.mealOnAnalyser.foods.length >= 1,
    foods       : state.foods.stageThree,
    pictureUri  : state.ui.pictureOnAnalyser,
    isLoading   : state.ui.isLoading,
    meal        : state.meals.mealOnAnalyser,
    macros      : state.meals.macros
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: (bool) => dispatch(setLoading(bool)),
    saveMeal: (meal) => dispatch(saveMeal(meal)),
    retakePicture: () => dispatch(pictureOnAnalyser(null)),
    resetFoods: () => dispatch(resetFoods()),
    resetMeals: () => dispatch(resetMeals()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
