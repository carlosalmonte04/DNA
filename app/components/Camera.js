import React, { Component } from 'react';
import {Alert, Text, View, TouchableOpacity, Image, Dimensions, StyleSheet, StatusBar, ScrollView } from 'react-native';
import {Container, Button, Icon, InputGroup, Input, Label, Item, Header, Left, Right, Body, Subtitle, Title, FooterTab, Footer, Form} from 'native-base'

import Camera from 'react-native-camera';
import { connect } from 'react-redux'
import startAnalyser from '../actions/ui/startAnalyser'
import toggleAddFoodModal from '../actions/ui/toggleAddFoodModal'
import pictureOnAnalyser from '../actions/ui/pictureOnAnalyser'
import * as Progress from 'react-native-progress';
import { Jiro } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import saveMeal from '../actions/meals/saveMeal'
import ImagePicker from 'react-native-image-crop-picker';
import updateMacrosInMeal from '../actions/meals/updateMacrosInMeal'
import addOrRemoveFood from '../actions/meals/addOrRemoveFood'
import changeSelOption from '../actions/foods/changeSelOption'
import changeOptions from '../actions/foods/changeOptions'
import changePortionSize from '../actions/foods/changePortionSize'
import getResourceForStageTwo from '../actions/foods/getResourceForStageTwo'
import getResourceForStageThree from '../actions/foods/getResourceForStageThree'
import { _cleanedAnalysis } from '../actions/foods/analyse'
import DashboardContainer from './DashboardContainer'
import * as Animatable from 'react-native-animatable';

import resetFoods from '../actions/foods/resetFoods'
import resetMeals from '../actions/meals/resetMeals'

import Preview from './Preview'
import Food from '../models/food'
import AddFoodForm from './AddFoodForm'
import EditFood from './EditFood'

const {width, height} = Dimensions.get('window');

class CameraScreen extends Component {

  state ={
    hasCameraPermission: null,
    foodName: '',
    portionSize: 1,
    isFoodsShowing: false,
    isLoading: true,
    foods: [],
    foodSelected: null,
    foodBeingEdited: null,
    isEditDropdwnOpen: false,
    isDashboardOpen: false,
    isFoodModalOpen: false,
    calorie      : this.props.macros.calorie,
    protein      : this.props.macros.protein,
    fat          : this.props.macros.fat,
    carbohydrate : this.props.macros.carbohydrate,
  }

  handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(picture => {
      this.props.startAnalyser(picture.path)
    }); 
  }

  handleRetake = () => {
    Alert.alert(
      'Retake Picture',
      'Unsaved results will be permanently erased.',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: this.props.resetAll},
      ],
      { cancelable: true }
    )
  }

  takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then(picture => {
        console.log("PICTURE PATH!!!", picture)
        this.props.startAnalyser(picture.path)
      })
      .catch(err => console.error(err));
  }

  handleOverlayPress = () => {
     this.setState({isFoodsShowing: false})
  }

  handleSave = async () => {
    this.props.saveMeal(this.props.meal)
    .then(() => { 
      this.setState({isDashboardOpen: true })
      this.props.resetFoods()
      this.props.resetMeals()
      this.props.retakePicture()
    })
  }

  handleAddFoodChange = (foodName) => {
    if (foodName.length > 3) {
      this.props.getFoods(foodName)
      .then(foods => {
        console.log("Foods", foods)
        this.setState({foodName, foods, isLoading: false, isFoodsShowing: true})
      })
    }
  }

  handleEditFoodChange = (food, foodName) => { 
    this.setState({isLoading: true, isFoodsShowing: true})
    this.props.getOptions(food, foodName)
    .then(newOptions => {
      newOptions[0].selected = true
      this.props.changeFoodOptions(food, newOptions)
      this.props.updateMacros()
      this.setState({isLoading: false})
    })
  }


  handleOptionChange = (food, selectedOptionId, foodInput) => {
    this.setState({isLoading: true})
    this.props.changeSelOption(food, selectedOptionId)
    const selectedOption = food.selectedOption()
    this.props.getAnalysis(food, selectedOption.ndbno)
    .then(usdaAnalysis => {
      const analysis = _cleanedAnalysis(usdaAnalysis)
      food.macros  = analysis.macros 
      food.micros  = analysis.micros 
      food.measure = analysis.measure 
      food.qty     = analysis.qty 
    })
    .then(() => {
      this.props.updateMacros()
      foodInput.state.value = selectedOption.name
      foodInput.refs.input.blur()
      this.setState({foodBeingEdited: food, isLoading: false, isFoodsShowing: false})
    })
  }

  handlePortionSizeChange = (food, portionSize) => {
    this.props.changePortionSize(food, portionSize)
    this.setState({})
  }

  handleFoodSubmit = () => {
    this.state.foodSelected.probability = 1
  }

  handleLongFoodPress = (food) => {
    this.setState({
      foodBeingEdited: food, 
      foods: food.options,
      foodName: food.name,
      isEditFoodModalOpen: true,
    })
  }

  handleManualFoodPress = (foodInput, foodSelected) => {
    foodInput.value = foodSelected.name
    foodSelected = new Food(foodSelected)
    this.props.getAnalysis(foodSelected, foodSelected.ndbno)
    .then(usdaAnalysis => {
      const analysis = _cleanedAnalysis(usdaAnalysis)
      foodSelected.addAttributes(analysis)
      foodSelected.macros  = analysis.macros 
      this.setState({foodName: foodSelected.name, foodSelected, isFoodsShowing: false})
    })
  }

  handleAddRemoveFood = (foodId) => {
    this.props.addOrRemoveFood(foodId)
    this.setState({
        isSelected : !!this.props.meal.foods.includes(this.props.food)
    })

  }

  setFoodsShowing = (bool) => {
    this.setState({isFoodsShowing: bool}) 
  }

  setLoading = (bool) => {
    this.setState({isLoading: bool}) 
  }  

  isSelected = (food) => {
    return this.props.meal.foods.includes(food)
  }

  _renderFoods = () => {
    if (this.props.isLoading) {
      return(
      <View style={styles.bottom}>
        <View style={styles.shutterContainer}>
          <TouchableOpacity onPress={this.takePicture}>
            <Progress.Circle thickness={3} borderWidth={8}  color={'#B6B3B3'} progress={this.state.caloriePercent || 0} size={70} animated={true} indeterminate={true} style={{top: 10}}/>
          </TouchableOpacity>
        </View>
      </View>
      )
    }
    else {
      const foodsHtml = this.props.foods.sort((a, b) => b.probability - a.probability).map((food, i) => {
        return (
          <Button 
            key={i} 
            style={[styles.food, styles.shadow, {backgroundColor: this.isSelected(food) ? '#8cba92' : '#e5f9f5', transform: [{scale: this.isSelected(food) ? 1.08 : 1}] } ]} 
            onPress={() => this.handleAddRemoveFood(food.id)}
            onLongPress={() => this.handleLongFoodPress(food)}
            >
            <Text style={{fontSize: 48 * food.probability, color: '#666765', fontWeight: '300', backgroundColor: 'transparent' }}>{food.name}</Text>
          </Button>
        )
      })
      return(
        <View style={styles.bottom}>
            <ScrollView>
              <View style={styles.foods}>
                {foodsHtml}
              </View>
            </ScrollView>
        </View>
      )
    }
  }

  _renderControllers = () => {
    return(
      <View style={styles.bottom}>
      <View style={{flex: 1}}>
        <View style={styles.shutterContainer}>
          <TouchableOpacity onPress={this.takePicture}>
            <Image source={require('../assets/img/cameraShutter.png')} height={70} width={70}/>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }
  _renderPicture = () => {
    return(
      <View style={[styles.camera, styles.shadow]}>
        <Preview {...this.props} handleSave={this.handleSave} />
      </View>
    )
  }

  _renderCamera = () => {
    return(
      <Camera
        ref={(cam) => {this.camera = cam;}}
        style={styles.camera}
        aspect={Camera.constants.Aspect.fill}
        mirrorImage={false}
        captureTarget={Camera.constants.CaptureTarget.disk}
        captureQuality="medium">
      </Camera>
    )
  }

  render() {
    return (
      <Container>
        <StatusBar hidden={false}/>
        <View style={styles.container}>
         <Header style={styles.header}>
            <Left>
              <Button transparent>
              </Button>
            </Left>
            <Body>
                <Image source={require('../assets/img/logoOnHeader.png')} height={100} width={100} style={{bottom: 0}}/>
            </Body>
            <Right>
            </Right>
          </Header>
          {this.props.pictureUri ? this._renderPicture() : this._renderCamera()}
          {this.props.pictureUri ? this._renderFoods() : this._renderControllers()}
          <Footer style={styles.footer}>
            <FooterTab style={{flex: 1, flexDirection: 'row'}}>
              <Button style={{flex: 0.33}} onPress={this.handleImagePicker}>
                <Icon name="ios-attach" style={{fontSize: 32, color: '#696e68'}}/>
              </Button>
              {this.props.foods.length > 1 ? <Button rounded onPress={this.props.toggleAddFoodModal} style={styles.addFoodButton}><Text style={{fontSize: 20, fontWeight: '400', color: '#696e68', top: 2}}>Add food</Text><Icon name="ios-add" style={{fontSize: 38, fontWeight: '400', bottom: 1}}/></Button> : <Button style={styles.empty}/>}
              <Button onPress={() => this.setState({isDashboardOpen: true})} style={{flex: 0.33}}>
                <Text style={{color: '#696e68', bottom: 5}}>Dashboard</Text>
                <Icon style={{color: '#696e68'}} name="ios-arrow-up"/>
              </Button>
            </FooterTab>
          </Footer>
        </View>
        <Modal
          ref={"addFoodModal"}
          style={{height: height * 0.85}}
          position={'bottom'}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={this.props.toggleAddFoodModal}
          isOpen={!!this.props.isFoodModalOpen}
          >
          <AddFoodForm {...this.state} 
            handleOverlayPress={this.handleOverlayPress}
            handleAddFoodChange={this.handleAddFoodChange}
            handleFoodNameChange={this.handleFoodNameChange}
            handlePortionSizeChange={this.handlePortionSizeChange}
            handleFoodSubmit={this.handleFoodSubmit}
            handleManualFoodPress={this.handleManualFoodPress}
            setFoodsShowing={this.setFoodsShowing}
            getFoods={this.props.getFoods}
          />
        </Modal>
        <Modal
          ref={"editFood"}
          style={{height: height * 0.85}}
          position={'bottom'}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={()=> this.setState({isEditFoodModalOpen: false})}
          isOpen={!!this.state.isEditFoodModalOpen}
          >
          <EditFood 
            {...this.props} {...this.state} 
            handleOverlayPress={this.handleOverlayPress}
            setFoodsShowing={this.setFoodsShowing} 
            handlePortionSizeChange={this.handlePortionSizeChange}
            setLoading={this.setLoading} 
            food={this.state.foodBeingEdited} 
            handleEditFoodChange={this.handleEditFoodChange} 
            handleOptionChange={this.handleOptionChange}
          />
        </Modal>
        <Modal
          ref={"dashboardModal"}
          style={{height: height}}
          position={'bottom'}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={() => this.setState({isDashboardOpen: false})}
          isOpen={!!this.state.isDashboardOpen}
          >
          <DashboardContainer navigation={this.props.navigation} />
        </Modal>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    height: height * 0.08,
    top: 2,
    left: 4
  },
  camera: {
    height: height * 0.49
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: height * 0.35,
  },
  previousMealContainer: {
    position: 'absolute',
    width: 60,
    height: 70,
    margin: 30,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.1,
    backgroundColor: '#f9f8f3'
  },
  previousMeal: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    alignItems: 'center',
    top: 5
  },
  shutterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: "6%"

  },
  footer: {
    flex: 1,
    height: height * 0.2
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: 'transparent',
    zIndex: 1
  },
  foods: {
    flexDirection: 'row',
    width: width,
    height: "100%",
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  food: {
    margin: 10,
    padding: 16,
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: -1,
      height: 1
    }
  },
  form: {
    width: width * 0.8,
    alignSelf: 'center'
  },
  addFoodButton: {
    flex: 0.33,
    bottom: 2,
    backgroundColor: '#fec64a',
    borderRadius: 0,
    height: 70,
    width: 100,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  empty: {
    flex: 0.33,
    bottom: 2,
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: 70,
    width: 100,
  }
})

function mapStateToProps(state) {
  return {
    previewVisible: state.meals.mealOnAnalyser.foods.length >= 1,
    foods: state.foods.stageThree,
    pictureUri  : state.ui.pictureOnAnalyser,
    isLoading   : state.ui.isLoading,
    isFoodModalOpen   : state.ui.isFoodModalOpen,
    user: state.user.user,
    meal: state.meals.mealOnAnalyser,
    macros      : state.meals.macros,
    micros : state.meals.micros,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startAnalyser: (picturePath) => dispatch(startAnalyser(picturePath)),
    saveMeal: (meal) => dispatch(saveMeal(meal)),
    toggleAddFoodModal: () => dispatch(toggleAddFoodModal()),
    getFoods: (foodName) => dispatch(getResourceForStageTwo(new Food(), foodName)),
    getOptions: (food, foodName) => dispatch(getResourceForStageTwo(food, foodName)),
    getAnalysis: (food, ndbno) => dispatch(getResourceForStageThree(food, ndbno)),
    addOrRemoveFood: (foodId) => dispatch(addOrRemoveFood(foodId)),
    changeSelOption: (food, selectedOptionId) => dispatch(changeSelOption(food, selectedOptionId)),
    updateMacros: () => dispatch(updateMacrosInMeal()),
    changeFoodOptions: (food, newOptions) => dispatch(changeOptions(food, newOptions)),
    changePortionSize: (food, portionSize) => dispatch(changePortionSize(food, portionSize)),
    resetFoods: () => dispatch(resetFoods()),
    resetMeals: () => dispatch(resetMeals()),
    retakePicture: () => dispatch(pictureOnAnalyser(null))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)


