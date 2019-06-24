/*
  eslint
  no-use-before-define: 0
*/
import React, { Component } from 'react';
import {
  FlatList,
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
  PanResponder,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  Form,
} from 'native-base';
import * as T from '@dnaActions';
import { userMealsSel } from '@dnaReducers';
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
  resetMeals,
} from '@dnaActions';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { Jiro } from 'react-native-textinput-effects';
import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';
import * as Animatable from 'react-native-animatable';
import { Colors, HEIGHT, WIDTH, DEFAULT_HEADER_HEIGHT } from 'assets';
import { DEV, defaultRefs } from 'config/env';
import { Food } from '@dnaModels';
import {
  FullScreenContainer,
  DnaImage,
  ConceptListItem,
  DnaContainer,
  DnaShadowContainer,
} from '@dnaCommon';

import { ConceptsList, DnaCalendar } from 'components/Home';

const { width, height } = Dimensions.get('window');

const createAnimation = (
  value,
  toValue,
  duration,
  easing = Easing.elastic(0.7),
  delay = 0,
  useNativeDrive = true,
) => {
  return Animated.timing(value, {
    toValue,
    duration: duration || 1000,
    easing,
    delay,
    useNativeDrive,
  });
};

class UnconnectedHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      animEnded: false,
      // calorie: this.props.meal.macros.calorie,
      // protein: this.props.meal.macros.protein,
      // fat: this.props.macros.fat,
      // carbohydrate: this.props.macros.carbohydrate
    };
    this._animVal = new Animated.Value(0);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: this.onTouchStart,
      onPanResponderMove: this.onTouchMove,
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: this.onTouchEnd,
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: () => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  componentDidMount() {
    // if (this.props.pictureOnAnalyser) {
    //   this._animPictureToTop();
    // }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { pictureOnAnalyser } = this.props;
    const { pictureOnAnalyser: nextPictureOnAnalyser } = nextProps;

    if (!nextPictureOnAnalyser) {
      this._animPictureToCenter();
      return;
    }
    if (!pictureOnAnalyser && nextPictureOnAnalyser) {
      this._animPictureToTop();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { activeMealId } = this.props;
    const { animEnded, calMidway } = this.state;
    const { activeMealId: nextActiveMealId } = nextProps;
    const { animEnded: nextAnimEnded, calMidway: nextCalMidway } = nextState;

    if (activeMealId !== nextActiveMealId) {
      return true;
    }

    if (this.state !== nextState) {
      return true;
    }

    if (animEnded !== nextAnimEnded) {
      return true;
    }

    if (calMidway !== nextCalMidway) {
      return true;
    }

    console.log(`New state!!!!`, { ...this.state }, { ...nextState });

    return true;
  }

  onTouchMove = ({ nativeEvent }, { y0, moveY }) => {
    if (this.props.activeMealId) {
      return null;
    }

    if (moveY > y0 && this.state.calMidway) {
      this.setState({ calMidway: false });
    } else if (moveY < y0 && !this.state.calMidway) {
      this.setState({ calMidway: true });
    }
  };

  _animPictureToTop = () => {
    this.setState({ animEnded: true, mealFocused: true }, () =>
      createAnimation(
        this._animVal,
        1,
        null,
        undefined,
        null,
        1000,
        true,
      ).start(),
    );
  };

  _animPictureToCenter = () => {
    createAnimation(this._animVal, 0, null, undefined, true, true).start(() =>
      this.setState({ animEnded: false, mealFocused: false }),
    );
  };

  handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(picture => {
      this.props.startAnalyser(picture.path);
    });
  };

  handleRetake = () => {
    Alert.alert(
      'Retake Picture',
      'Unsaved results will be permanently erased.',
      [{ text: 'Cancel' }, { text: 'OK', onPress: this.props.resetAll }],
      { cancelable: true },
    );
  };

  takePicture = () => {
    const { user } = this.props;
    console.log('taking pic');
    const options = { jpegQuality: '70%' };
    //options.location = ...
    this.camera
      .capture({ metadata: options })
      .then(picture => {
        console.log('PICTURE PATH!!!', picture.path, user.token);
        this.props.startAnalyser(picture.path, user.token);
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
        console.log('Foods', foods);
        this.setState({
          foodName,
          foods,
          isLoading: false,
          isFoodsShowing: true,
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
          isFoodsShowing: false,
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
      isEditFoodModalOpen: true,
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
          isFoodsShowing: false,
        });
      });
  };

  handleAddRemoveFood = async foodId => {
    const { meal } = this.props;
    const isFoodInMeal = meal[foodId];

    if (isFoodInMeal) meal.removeFood(foodId);
    else await meal.addFood(foodId);

    this.setState({
      isSelected: isFoodInMeal,
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

  onProfilePress = () => this.props.navigation.navigate('UserProfile');

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
    // if (!this.props.activeMeal.concepts) {
    //   return null;
    // }

    // if (this.props.isLoading) {
    //   return (
    //     <TouchableOpacity onPress={this.takePicture}>
    //       <Progress.Circle
    //         thickness={3}
    //         borderWidth={8}
    //         color={Colors.gray}
    //         progress={this.state.caloriePercent || 0}
    //         size={70}
    //         animated={true}
    //         indeterminate={true}
    //         style={{
    //           height: 50,
    //           width: 50,
    //           borderRadius: 25,
    //           borderColor: Colors.gray,
    //           borderWidth: 4,
    //           backgroundColor: Colors.white05,
    //           alignSelf: "center",
    //           bottom: 50,
    //           position: "absolute"
    //         }}
    //       />
    //     </TouchableOpacity>
    //   );
    // }

    return (
      <ConceptsList
        key={1}
        conceptsIds={this.props.activeMeal.concepts}
        activeMealId={this.props.activeMeal._id}
      />
    );
  };

  _renderControllers = () => (
    <TouchableOpacity onPress={this.takePicture}>
      <View
        style={{
          position: 'absolute',
          height: 50,
          width: 50,
          borderRadius: 25,
          borderColor: Colors.gray,
          borderWidth: 4,
          backgroundColor: Colors.white05,
          alignSelf: 'center',
          bottom: 50,
        }}
      />
    </TouchableOpacity>
  );

  toggleAnimStatus = newState => {
    if (newState === 'atCenter') {
      this._animPictureToCenter();
    } else {
      this._animPictureToTop();
    }
  };

  _getCameraRef = () => this.camera;

  _renderPicture = pictureUrl => [
    <DnaImage
      key={0}
      source={{ uri: pictureUrl }}
      style={[localStyles.picture]}
    />,
  ];

  _renderCamera = () => {
    return (
      <>
        <Camera
          key={0}
          ref={cam => {
            this.camera = cam;
          }}
          style={localStyles.camera}
          aspect={Camera.constants.Aspect.fill}
          mirrorImage={false}
          captureTarget={Camera.constants.CaptureTarget.disk}
          captureQuality="medium"
        />
        <TouchableOpacity
          key={1}
          onPress={this.takePicture}
          style={{
            position: 'absolute',
            height: 50,
            width: 50,
            borderRadius: 25,
            // borderColor: Colors.gray,
            borderColor: 'red',
            borderWidth: 4,
            backgroundColor: Colors.white05,
            alignSelf: 'center',
            bottom: 50,
          }}
        />
      </>
    );
  };

  getFlatListRef = () => this._flatList;

  renderMealItem = ({ item: { pictureUrl, _id: mealId }, index }) => {
    const { mealOnAnalyserId, pictureOnAnalyser } = this.props;
    if (!index) {
      return (
        <DnaShadowContainer
          animated
          camera
          itemIndex={index}
          mealId={mealOnAnalyserId}
          parentFlatList={this._flatList}
          containerStyle={localStyles.cameraContainer}
          toggleAnimStatus={this.toggleAnimStatus}
        >
          {this._renderCamera()}
        </DnaShadowContainer>
      );
    }
    return (
      <DnaShadowContainer
        animated
        itemIndex={index}
        key={pictureUrl}
        index={index}
        mealId={mealId}
        containerStyle={[localStyles.cameraContainer]}
        parentFlatList={this._flatList}
        toggleAnimStatus={this.toggleAnimStatus}
      >
        {this._renderPicture(pictureUrl)}
      </DnaShadowContainer>
    );
  };

  renderUserMeals = () => {
    const { userMeals } = this.props;

    if (!userMeals.length) {
      return null;
    }
  };

  render() {
    const { userMeals, activeMealId } = this.props;
    const { mealFocused } = this.state;

    const conceptsTopValue = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [HEIGHT, HEIGHT * 0.1],
    });

    const opacity = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    console.log(`CAM - mealFocused`, this.props.activeMealId);
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <View style={{ flex: 0.18 }}>
          <DnaCalendar
            hide={!!this.props.activeMealId}
            midway={this.state.calMidway}
          />
        </View>
        <FlatList
          // {...this._panResponder.panHandlers}
          ref={el => {
            this._flatList = el;
          }}
          key={1}
          data={userMeals}
          renderItem={this.renderMealItem}
          contentContainerStyle={{
            paddingBottom: DEFAULT_HEADER_HEIGHT,
          }}
          scrollEventThrottle={16}
          scrollEnabled={!activeMealId}
        />
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  bgImg: {
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  picture: {
    flex: 1,
  },
  cameraContainer: {
    alignSelf: 'center',
    marginVertical: 32,
    overflow: 'hidden',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: Colors.black,
    backgroundColor: 'red',
  },
  camera: {
    flex: 1,
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 0.5,
  },
  previousMealContainer: {
    position: 'absolute',
    width: 60,
    height: 70,
    margin: 30,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0.1,
    backgroundColor: '#f9f8f3',
  },
  previousMeal: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    top: 5,
  },
  shutterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: '6%',
  },
  footer: {
    flex: 1,
    height: height * 0.2,
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  foods: {
    flexDirection: 'row',
    width: width,
    height: '100%',
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
      height: 1,
    },
  },
  form: {
    width: width * 0.8,
    alignSelf: 'center',
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
      height: 1,
    },
  },
  empty: {
    flex: 0.33,
    bottom: 2,
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: 70,
    width: 100,
  },
});

const mapStateToProps = state => {
  const {
    meals: {
      userMealsData,
      mealOnAnalyser,
      mealOnAnalyser: {
        macros,
        micros,
        foods: mealFoods,
        concepts: mealConcepts,
        conceptsData: mealConceptsData,
        _id: mealOnAnalyserId,
      },
      activeMealId,
    },
    foods: { stageThree: foods },
    ui: { pictureOnAnalyser, isLoading, isFoodModalOpen },
    user,
  } = state;
  const userMeals = userMealsSel(state);

  return {
    previewVisible: DEV && false && !!mealConcepts && mealConcepts.length,
    foods,
    activeMealId,
    userMeals: userMeals || defaultRefs.emptyArr,
    mealConcepts,
    pictureOnAnalyser,
    isLoading,
    isFoodModalOpen,
    mealOnAnalyserId,
    activeMeal:
      mealOnAnalyserId === activeMealId
        ? mealOnAnalyser
        : userMealsData[activeMealId],
    user,
    meal: mealOnAnalyser,
    macros,
    micros,
  };
};

UnconnectedHome.defaultProps = {
  activeMeal: defaultRefs.emptyObj,
};

export default connect(
  mapStateToProps,
  {
    startAnalyser,
    saveMeal,
    toggleAddFoodModal,
    addOrRemoveFood,
    reset: () => dispatch => dispatch({ type: T.RESET_KEEP_LOGGED_IN }),
  },
)(UnconnectedHome);
