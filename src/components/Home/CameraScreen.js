import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView
} from "react-native";
import {
  Container,
  Button,
  Icon,
  InputGroup,
  Input,
  Label,
  Item,
  Header,
  Left,
  Right,
  Body,
  Subtitle,
  Title,
  FooterTab,
  Footer,
  Form
} from "native-base";
import {
  toggleAddFoodModal,
  startAnalyser,
  pictureOnAnalyser,
  saveMeal,
  updateMacrosInMeal,
  addOrRemoveFood,
  changeSelOption,
  changeOptions,
  changePortionSize,
  getResourceForStageTwo,
  getResourceForStageThree,
  _cleanedAnalysis,
  resetFoods,
  resetMeals
} from "@dnaActions";
import Camera from "react-native-camera";
import { connect } from "react-redux";
import * as Progress from "react-native-progress";
import { Jiro } from "react-native-textinput-effects";
import Modal from "react-native-modalbox";
import ImagePicker from "react-native-image-crop-picker";
import * as Animatable from "react-native-animatable";
import { Img, Colors, HEIGHT } from "@dnaAssets";
import { DEV } from "@dnaConfig";
import { Food } from "@dnaModels";
import { FullScreenContainer, ConceptListItem, DnaContainer } from "@dnaCommon";

import DashboardContainer from "../DashboardContainer";
import Preview from "../Preview";
import { ConceptsList, CameraControllers, INACTIVE_LIST_HEIGHT } from "./";
import AddFoodForm from "../AddFoodForm";
import EditFood from "../EditFood";

const { width, height } = Dimensions.get("window");

class UnconnectedCameraScreen extends Component {
  state = {
    hasCameraPermission: null,
    foodName: "",
    portionSize: 1,
    isFoodsShowing: false,
    isLoading: true,
    foods: [],
    foodSelected: null,
    foodBeingEdited: null,
    isEditDropdwnOpen: false,
    isDashboardOpen: false,
    isFoodModalOpen: false,
    calorie: this.props.meal.macros.calorie,
    protein: this.props.meal.macros.protein,
    fat: this.props.macros.fat,
    carbohydrate: this.props.macros.carbohydrate
  };

  handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(picture => {
      this.props.startAnalyser(picture.path);
    });
  };

  handleRetake = () => {
    Alert.alert(
      "Retake Picture",
      "Unsaved results will be permanently erased.",
      [{ text: "Cancel" }, { text: "OK", onPress: this.props.resetAll }],
      { cancelable: true }
    );
  };

  takePicture = () => {
    const options = { jpegQuality: "70%" };
    //options.location = ...
    this.camera
      .capture({ metadata: options })
      .then(picture => {
        console.log("PICTURE PATH!!!", picture);
        this.props.startAnalyser(picture.path);
      })
      .catch(err => console.error(err));
  };

  handleOverlayPress = () => {
    this.setState({ isFoodsShowing: false });
  };

  handleSave = async () => {
    this.props.saveMeal(this.props.meal).then(() => {
      this.setState({ isDashboardOpen: false });
      this.props.resetFoods();
      this.props.resetMeals();
      this.props.retakePicture();
    });
  };

  handleAddFoodChange = foodName => {
    if (foodName.length > 3) {
      this.props.getFoods(foodName).then(foods => {
        console.log("Foods", foods);
        this.setState({
          foodName,
          foods,
          isLoading: false,
          isFoodsShowing: true
        });
      });
    }
  };

  handleEditFoodChange = (food, foodName) => {
    this.setState({ isLoading: true, isFoodsShowing: true });
    this.props.getOptions(food, foodName).then(newOptions => {
      newOptions[0].selected = true;
      this.props.changeFoodOptions(food, newOptions);
      this.props.updateMacros();
      this.setState({ isLoading: false });
    });
  };

  handleOptionChange = (food, selectedOptionId, foodInput) => {
    this.setState({ isLoading: true });
    this.props.changeSelOption(food, selectedOptionId);
    const selectedOption = food.selectedOption();
    this.props
      .getAnalysis(food, selectedOption.ndbno)
      .then(usdaAnalysis => {
        const analysis = _cleanedAnalysis(usdaAnalysis);
        food.macros = analysis.macros;
        food.micros = analysis.micros;
        food.measure = analysis.measure;
        food.qty = analysis.qty;
      })
      .then(() => {
        this.props.updateMacros();
        foodInput.state.value = selectedOption.name;
        foodInput.refs.input.blur();
        this.setState({
          foodBeingEdited: food,
          isLoading: false,
          isFoodsShowing: false
        });
      });
  };

  handlePortionSizeChange = (food, portionSize) => {
    this.props.changePortionSize(food, portionSize);
    this.setState({});
  };

  handleFoodSubmit = () => {
    this.state.foodSelected.probability = 1;
  };

  handleLongFoodPress = food => {
    this.setState({
      foodBeingEdited: food,
      foods: food.options,
      foodName: food.name,
      isEditFoodModalOpen: true
    });
  };

  handleManualFoodPress = (foodInput, foodSelected) => {
    foodInput.value = foodSelected.name;
    foodSelected = new Food(foodSelected);
    this.props
      .getAnalysis(foodSelected, foodSelected.ndbno)
      .then(usdaAnalysis => {
        const analysis = _cleanedAnalysis(usdaAnalysis);
        foodSelected.addAttributes(analysis);
        foodSelected.macros = analysis.macros;
        this.setState({
          foodName: foodSelected.name,
          foodSelected,
          isFoodsShowing: false
        });
      });
  };

  handleAddRemoveFood = async foodId => {
    const { meal } = this.props;
    const isFoodInMeal = meal[foodId];

    if (isFoodInMeal) meal.removeFood(foodId);
    else await meal.addFood(foodId);

    this.setState({
      isSelected: isFoodInMeal
    });
  };

  setFoodsShowing = bool => {
    this.setState({ isFoodsShowing: bool });
  };

  setLoading = bool => {
    this.setState({ isLoading: bool });
  };

  isSelected = food => {
    return this.props.meal.foods.includes(food);
  };

  onProfilePress = () => this.props.navigation.navigate("UserProfile");

  _renderConceptListItem = conceptId => {
    const concept = this.props.meal.conceptsData[conceptId];

    return (
      <ConceptListItem
        key={conceptId}
        concept={concept}
        isSelected={this.props.meal.selectedConcepts[concept.id]}
      />
    );
  };

  _renderConcepts = () => {
    if (this.props.isLoading) {
      return (
        <View style={localStyles.bottom}>
          <View style={localStyles.shutterContainer}>
            <TouchableOpacity onPress={this.takePicture}>
              <Progress.Circle
                thickness={3}
                borderWidth={8}
                color={Colors.gray}
                progress={this.state.caloriePercent || 0}
                size={70}
                animated={true}
                indeterminate={true}
                style={{ top: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return <ConceptsList conceptsIds={this.props.meal.concepts} />;
  };

  _renderControllers = () => (
    <CameraControllers getCameraRef={this._getCameraRef} />
  );

  _getCameraRef = () => this.camera;

  _renderPicture = () => <Preview {...this.props} save={this.handleSave} />;

  _renderCamera = () => {
    return (
      <Camera
        ref={cam => {
          this.camera = cam;
        }}
        style={localStyles.camera}
        aspect={Camera.constants.Aspect.fill}
        mirrorImage={false}
        captureTarget={Camera.constants.CaptureTarget.disk}
        captureQuality="medium"
      />
    );
  };

  render() {
    const { pictureOnAnalyser, meal } = this.props;

    return (
      <DnaContainer>
        <StatusBar hidden={false} />
        <Header style={localStyles.header}>
          <Left>
            <Button transparent />
          </Left>
          <Body>
            <Image
              source={Img.greenLogoSmall}
              height={100}
              width={100}
              style={{ bottom: 0 }}
            />
          </Body>
          <Right />
        </Header>
        {pictureOnAnalyser ? this._renderPicture() : this._renderCamera()}
        {pictureOnAnalyser ? this._renderConcepts() : this._renderControllers()}
        {/*<Modal
          ref={"addFoodModal"}
          style={{ height: height * 0.85 }}
          position={"bottom"}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={this.props.toggleAddFoodModal}
          isOpen={!!this.props.isFoodModalOpen}
        >
          <AddFoodForm
            {...this.state}
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
          style={{ height: height * 0.85 }}
          position={"bottom"}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={() => this.setState({ isEditFoodModalOpen: false })}
          isOpen={!!this.state.isEditFoodModalOpen}
        >
          <EditFood
            {...this.props}
            {...this.state}
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
          style={{ height: height }}
          position={"bottom"}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={() => this.setState({ isDashboardOpen: false })}
          isOpen={!!this.state.isDashboardOpen}
        >
          <DashboardContainer navigation={this.props.navigation} />
        </Modal>*/}
      </DnaContainer>
    );
  }
}

const localStyles = StyleSheet.create({
  belowHeaderContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  header: {
    // height: DEFAULT_HEADER_HEIGHT
  },
  camera: {
    flex: 0.6,
    // height: HEIGHT - INACTIVE_LIST_HEIGHT,
    width: "100%"
  },
  bottom: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    flex: 0.5
  },
  previousMealContainer: {
    position: "absolute",
    width: 60,
    height: 70,
    margin: 30,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.1,
    backgroundColor: "#f9f8f3"
  },
  previousMeal: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    alignItems: "center",
    top: 5
  },
  shutterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    top: "6%"
  },
  footer: {
    flex: 1,
    height: height * 0.2
  },
  image: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 1
  },
  foods: {
    flexDirection: "row",
    width: width,
    height: "100%",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  food: {
    margin: 10,
    padding: 16
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
    alignSelf: "center"
  },
  addFoodButton: {
    flex: 0.33,
    bottom: 2,
    backgroundColor: "#fec64a",
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
    backgroundColor: "transparent",
    borderRadius: 0,
    height: 70,
    width: 100
  }
});

const mapStateToProps = ({
  meals: {
    mealOnAnalyser: meal,
    mealOnAnalyser: {
      macros,
      micros,
      foods: mealFoods,
      concepts: mealConcepts,
      conceptsData: mealConceptsData
    }
  },
  foods: { stageThree: foods },
  ui: { pictureOnAnalyser, isLoading, isFoodModalOpen },
  user
}) => ({
  previewVisible: DEV && false && !!mealConcepts && mealConcepts.length,
  foods,
  mealConcepts,
  pictureOnAnalyser,
  isLoading,
  isFoodModalOpen,
  user,
  meal,
  macros,
  micros
});
function mapDispatchToProps(dispatch) {
  return {
    startAnalyser: picturePath => dispatch(startAnalyser(picturePath)),
    saveMeal: meal => dispatch(saveMeal(meal)),
    toggleAddFoodModal: () => dispatch(toggleAddFoodModal()),
    getFoods: foodName =>
      dispatch(getResourceForStageTwo(new Food(), foodName)),
    getOptions: (food, foodName) =>
      dispatch(getResourceForStageTwo(food, foodName)),
    getAnalysis: (food, ndbno) =>
      dispatch(getResourceForStageThree(food, ndbno)),
    addOrRemoveFood: foodId => dispatch(addOrRemoveFood(foodId)),
    changeSelOption: (food, selectedOptionId) =>
      dispatch(changeSelOption(food, selectedOptionId)),
    updateMacros: () => dispatch(updateMacrosInMeal()),
    changeFoodOptions: (food, newOptions) =>
      dispatch(changeOptions(food, newOptions)),
    changePortionSize: (food, portionSize) =>
      dispatch(changePortionSize(food, portionSize)),
    resetFoods: () => dispatch(resetFoods()),
    resetMeals: () => dispatch(resetMeals()),
    retakePicture: () => dispatch(pictureOnAnalyser(null))
  };
}

export const CameraScreen = connect(mapStateToProps, {
  startAnalyser,
  saveMeal,
  toggleAddFoodModal,
  addOrRemoveFood
})(UnconnectedCameraScreen);
