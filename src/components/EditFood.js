import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Dimensions, Text, Picker, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, ScrollView} from 'react-native';
import {Container, Button, Content, Form, Label, Icon} from 'native-base'
import { Jiro } from 'react-native-textinput-effects';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import * as _ from 'lodash'
import Food from '../models/food'

const {width, height} = Dimensions.get('window');

const PORTION_SIZES = []

const MACROS_ICONS = {
	calorie       : "ios-flash-outline",
	protein      : "ios-ionic-outline",
	fat          : "ios-flower-outline",
	carbohydrate : "ios-ice-cream-outline"
}

const MACROS_STYLES = {
	calorie       : {color: "#7c4a31"},
	protein      : {color: "#38387d"},
	fat          : {color: "#c3b042"},
	carbohydrate : {color: "#7c3c4e"},
}

for(let i = 1; i <= 20; i++) {
  PORTION_SIZES.push(<Picker.Item key={i} label={`${i}`} value={`${i}`}/>)
}


export default class EditFood extends Component {
	
	state = {
		portionSize: this.props.food.portionSize
	}

  _renderOptions = () => {
  	const options = this.props.food.options.map((option, i) => {
  		return (
  				<TouchableHighlight underlayColor={'#8cba92'} key={i} onPress={() => this.props.handleOptionChange(this.props.food, option.ndbno, this.refs.foodNameInput)} style={{paddingBottom: 10, flexWrap: 'wrap', backgroundColor: option.selected ? '#8cba92' : '#e5f9f5'}}>
  					<View style={{margin: 10, paddingLeft: 10}}>
  						<Text style={{fontSize: 18, fontWeight: '300', backgroundColor: 'transparent', color: 'black'}}>{option.name.split("GTIN").join("").split(", UPC: ")[0]}</Text>
  					</View>
  				</TouchableHighlight>
  		)
  	})
    return(
    	<ScrollView style={{flex: 1}}>
    		{options}
      </ScrollView>
    ) 
  }

  _renderLoader = () => {
  	return(
    	<Progress.Circle thickness={3} borderWidth={4}  color={'#B6B3B3'} progress={this.props.caloriePercent || 0} size={70} animated={true} indeterminate={true}/>
  	)
  }

  _renderMacros = () => {
  	const macros = this.props.food.macros
  	const macrosHtml = []
  	let i = 0
  	for(name in macros) {
  		const macroHtml =  <Text key={i} ><Icon name={`${MACROS_ICONS[name]}`} style={[MACROS_STYLES[name], {fontSize: 42, padding: 20}]} />: {parseInt(macros[name].value) * this.props.food.portionSize}</Text> 
  		macrosHtml.push(macroHtml)
  		i++
  	}
  	return(
      <View style={styles.macrosInfoContainer}>
      	<View>
      		<Text style={{color: '#64686b'}}>{this.props.portionSize} {this.props.food.measure} equals:</Text>
      	</View>
      	<View style={{flexDirection: 'row'}}>
      		{macrosHtml}
      	</View>
      </View>
  	)
  }

  componentDidMount() {
      this.props.setLoading(false)
  }

  render() {
      return (
        <LinearGradient colors={['transparent', 'transparent', '#d5f7f9']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', height: "100%"}}>
          <Form style={[styles.form, styles.shadow]}>
          	<Text style={styles.formTitle}>Edit</Text>
              <Jiro
              	ref="foodNameInput"
                label={'search options'}
                selectTextOnFocus
                style={styles.input}
                // this is used as active and passive border color
                borderColor={'#E3B041'}
                labelStyle={{fontWeight: '100', fontSize: 22, color: '#64686b'}}
                inputStyle={{ color: 'white', zIndex: 9 }}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={this.props.food.selectedOption().name}
                onChangeText={ _.debounce(() => this.props.handleEditFoodChange(this.props.food, this.refs.foodNameInput.state.value), 800)}
                onFocus={() => this.props.setFoodsShowing(true)}
              />
      				<View style={[styles.foodsContainer, {alignSelf: 'center', height: this.props.isFoodsShowing ? height : 0, width: this.props.isFoodsShowing ? width * 0.8 : width * 0.8}]} >
              	<TouchableWithoutFeedback onPress={this.props.handleOverlayPress}>
              		<View style={styles.topOverlay}>
              		</View>
              	</TouchableWithoutFeedback>
				        <View style={[styles.foods, {width: this.props.isFoodsShowing ? width * 0.8 : 0}]} transition={['width']} duration={250}>
				  				<LinearGradient colors={['#d8e2e8', '#d8e2e8', '#d8e2e8']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', height: "100%", alignItems: 'center'}}>
				  				<View>
				  					{this.props.isLoading ? this._renderLoader() : this._renderOptions()}
				  				</View>
				  				</LinearGradient>
				        </View>
	              <TouchableWithoutFeedback onPress={this.handleOverlayPress}>
	              	<View style={styles.bottomOverlay}>
	              	</View>
	              </TouchableWithoutFeedback>
      				</View>
              <View style={styles.pickerContainer}>
	              <Text style={styles.pickerLabel}>Portion size</Text>
	              <Picker
	              	style={styles.picker}
	                selectedValue={this.props.food.portionSize.toString()}
	                onValueChange={(portionSize) => this.props.handlePortionSizeChange(this.props.food, portionSize)}>
	                {PORTION_SIZES}
	              </Picker>
              </View>
              	{this._renderMacros()}
              <View style={styles.buttonsContainer}>
	              <Button block onPress={this.props.handleFoodSubmit} style={styles.addButton} >
	                <Text style={{color: "white", fontWeight: '400', fontSize: 20}}>Add</Text>
	              </Button>
	              <Button block style={styles.cancelButton} >
	                <Text style={{color: "white", fontWeight: '400', fontSize: 20}}>Cancel</Text>
	              </Button>
	             </View>
            </Form>
        </LinearGradient>
      )
  }
}

const styles = StyleSheet.create({
	form: {
		width: width * 0.9,
		alignSelf: 'center',
		height: height * 0.7,
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'center',
		zIndex: 9,
		borderWidth: 2,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: -3,
      height: 10
    },

	},
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: -1,
      height: 1
    }
  },
	formTitle: {
		backgroundColor: 'transparent',
		fontSize: 46,
		fontWeight: '300',
		color: '#64686b',
	},
	input: {
		width: width * 0.8,
	},
	foodsContainer: {
		height,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		bottom: height * 0.3
	},
	foods: {
		flex: 0.5,
	},
	result: {
		height: 50,
	},
	topOverlay: {
		flex: 0.3,
		zIndex: 11
	},
	bottomOverlay: {
		flex: 0.2,
		zIndex: 11
	},
	pickerContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		bottom: height * 0.1,
		zIndex: -8,
		position: 'relative',
	},
	pickerLabel: {
		backgroundColor: 'transparent',
		fontSize: 22,
		fontWeight: '500',
		color: '#64686b',
		width: width * 0.4,
		marginRight: -25,
		alignSelf: 'flex-end',
		top: 18
	},
	picker: {
		width: width * 0.2,
		alignSelf: 'flex-start'
	},
	macrosInfoContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	buttonsContainer: {
		width,
		top: -30
	},
  addButton: {
  	height: 50,
    backgroundColor: "#61a749",
    width: '80%',
    alignSelf: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: -3,
      height: 10
    },
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#a23026",
    width: '80%',
    alignSelf: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: -3,
      height: 10
    },
  }
})







