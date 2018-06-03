import React, { Component } from 'react';
import { View, Dimensions, ListView, ScrollView } from 'react-native';
import { connect } from 'react-redux'

import changePortionSize from '../actions/foods/changePortionSize'
import addOrRemoveFood from '../actions/meals/addOrRemoveFood'
import ListRowFront from './ListRowFront'
import ListRowBehind from './ListRowBehind'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import * as Animatable from 'react-native-animatable';

const NUTRIENT_ID = {
  energy: 208,
  protein: 203,
  fat: 204,
  carbohydrate: 205, 
}	

const screen = Dimensions.get('window');

class List extends Component {

	state = {
		isSelected  : false,
		portionSize : this.props.food.portionSize
	}

	changePortionSize = (portionSize) => { 
		this.refs.swipeRow.closeRow()
		this.props.changePortionSize(this.props.food, portionSize)
		this.setState({})
	}

  handleListPress = () => {
		this.props.addOrRemoveFood(this.props.food.id)
		this.setState({
			isSelected : !!this.props.meal.foods.includes(this.props.food)
		})
  }

  render() {
    return (
		  	<SwipeRow
		  	ref="swipeRow"
				rightOpenValue={-75}
				closeOnRowPress={true}
				disableRightSwipe={true}
				friction={10}
				tension={50}
				preview={true}
				previewDuration={200}
			>
				<View>
					<ListRowBehind key={this.props.food.name} food={this.props.food} changePortionSize={this.changePortionSize} />
				</View>
				<View>
					<ListRowFront key={this.props.food.name} isSelected={this.state.isSelected} food={this.props.food} handleListPress={this.handleListPress}/>
				</View>
			</SwipeRow>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addFood: (food) => dispatch(addFood(food)),
    removeFood: (foodId) => dispatch(removeFood(foodId)),
    addOrRemoveFood: (foodId) => dispatch(addOrRemoveFood(foodId)),
    changePortionSize: (food, portionSize) => dispatch(changePortionSize(food, portionSize))
  }
}

export default connect(null, mapDispatchToProps)(List)
