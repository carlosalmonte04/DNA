/*
  eslint
  react/no-unused-prop-types: 0
  react/no-typos: 0
*/
import React from "react";
import {
  Text,
  View,
  ViewPropTypes,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { truncate } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setActiveMealId } from "@dnaActions";
import {
  Colors,
  WIDTH,
  HEIGHT,
  DEFAULT_HEADER_HEIGHT,
  Icons,
  IOSX,
  Styles,
} from "@dnaAssets";
import { defaultRefs } from "@dnaConfig";
import { BoxShadow } from "react-native-shadow";
import { DnaHText, DnaPText, ConceptBadge } from "@dnaCommon";
import { ConceptsList } from "../Home";

const _mapPropsToShawoOptions = ({
  width,
  height,
  color,
  border,
  radius,
  opacity,
  x,
  y,
  style,
}) => ({
  width,
  height,
  color,
  border,
  radius,
  opacity,
  x,
  y,
  style,
});

const createAnimation = (
  value,
  toValue,
  duration,
  easing = Easing.elastic(0.7),
  delay = 0,
  useNativeDrive = true,
) => {
  return Animated.spring(value, {
    toValue,
    duration: duration || 700,
    easing,
    delay,
    useNativeDrive,
  });
};

const ViewToUse = ({ expanded, children }) =>
  expanded ? (
    <Animated.ScrollView contentContainerStyle={{ flex: 1 }}>
      {children}
    </Animated.ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

const localStyles = StyleSheet.create({
  heartIcon: {
    position: "absolute",
    right: IOSX ? 32 : 16,
    top: IOSX ? 32 : 16,
    resizeMode: "contain",
    width: 25,
    height: 25,
  },
  mealInfoContainer: {
    position: "absolute",
    // paddingBottom: IOSX ? 64 : 32,
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%",
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  conceptsPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

class UnconnectedDnaShadowContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      textContentHeight: 10,
    };
    this._animVal = new Animated.Value(0);
    this.animatedScale = new Animated.Value(1);
  }

  _animPictureToTop = () => {
    createAnimation(this._animVal, 1, null, undefined, true, true).start(
      this.setState({ expanded: true }, () => {
        this.props.setActiveMealId(this.props.mealId);
      }),
    );
  };

  _animPictureToCenter = () => {
    this.props.setActiveMealId("");
    createAnimation(this._animVal, 0, null, undefined, true, true).start(() => {
      this.setState({ expanded: false });
      this.props.setActiveMealId("");
    });
  };

  toggleAnimVal = () => {
    const { itemIndex, parentFlatList, toggleAnimStatus } = this.props;

    if (parentFlatList) {
      parentFlatList.scrollToIndex({ index: itemIndex });

      if (this.state.expanded) {
        this._animPictureToCenter();
        toggleAnimStatus("atCenter");
      } else {
        this._animPictureToTop();
        toggleAnimStatus("atTop");
      }
    }
  };

  renderMealName = () => {
    if (!this.props.meal.name) {
      return null;
    }

    return (
      <DnaHText
        bold
        size={1}
        color={Colors.gray}
        text={truncate(this.props.meal.name, { length: 14 })}
      />
    );
  };

  renderMealLocation = () => {
    return (
      <View style={localStyles.locationContainer}>
        <Image
          source={Icons.whiteLocation}
          style={localStyles.locationIcon}
          tintColor={Colors.gray07}
        />
        <DnaPText
          color={Colors.gray07}
          text="McDonalds, @ Bronx, NY"
          size={4}
        />
      </View>
    );
  };

  renderConceptsPreview = () => {
    if (!this.props.conceptsIds) {
      return null;
    }
    return (
      <View style={localStyles.conceptsPreviewContainer}>
        {this.props.conceptsIds.map(conceptId => (
          <ConceptBadge key={conceptId} conceptId={conceptId} />
        ))}
      </View>
    );
  };

  onTextLayout = ({
    nativeEvent: {
      layout: { height: textContentHeight },
    },
  }) => {
    const { textLayedOut } = this.state;
    if (!textLayedOut) {
      console.log(`CAM - TEXTHEIGHT LAYOUT`, textContentHeight);
      this.setState({ textContentHeight, textLayedOut: true });
    }
  };

  onPressIn = () => {
    console.log(`Press INN`);
    const { expanded } = this.state;
    if (!expanded) {
      Animated.timing(this._animVal, {
        toValue: -0.5,
        duration: 100,
        useNativeDrive: true,
      }).start();
    }
  };

  onPressOut = () => {
    const { expanded } = this.state;
    if (!expanded) {
      Animated.timing(this._animVal, {
        toValue: 0,
        duration: 100,
        useNativeDrive: true,
      }).start(() => {
        // this.setState({ expanded: false });
      });
    }
  };

  render() {
    const {
      children,
      containerStyle,
      disableShadow,
      animated,
      conceptsIds,
      camera,
      mealId,
      activeMealId,
    } = this.props;
    const { expanded, textLayedOut, textContentHeight } = this.state;

    const scale = this._animVal.interpolate({
      inputRange: [-0.5, 0, 1],
      outputRange: [0.89, 0.9, 1],
    });

    const pictureHeight = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [HEIGHT * 0.5, HEIGHT * 0.7],
      extrapolate: "clamp",
    });

    const borderRadius = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
      extrapolate: "clamp",
    });

    const textHeight = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, textContentHeight],
      extrapolate: "clamp",
    });

    const textPadding = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 16],
      extrapolate: "clamp",
    });

    console.log(`CAM - ACTIVE MEAL IDE!!!`, !!activeMealId);

    if (animated) {
      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <Animated.ScrollView
            style={{
              flex: 1,
              transform: [{ scale }],
              width: WIDTH,
              alignSelf: "center",
              overflow: "visible",
            }}
            contentContainerStyle={{
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              paddingBottom: expanded ? 100 : null,
            }}
            scrollEnabled={!!activeMealId}
          >
            <TouchableWithoutFeedback
              onPress={this.toggleAnimVal}
              onPressIn={this.onPressIn}
              onPressOut={this.onPressOut}
            >
              <Animated.View
                style={{
                  width: "100%",
                  overflow: "hidden",
                  borderRadius,
                  height: pictureHeight,
                }}
              >
                {children}
                <View style={localStyles.mealInfoContainer}>
                  {this.renderMealLocation()}
                  {this.renderMealName()}
                  {this.renderConceptsPreview()}
                </View>
                <Image
                  source={Icons.whiteHeart}
                  style={localStyles.heartIcon}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                backgroundColor: Colors.white,
                padding: textPadding,
                height: textLayedOut ? textHeight : null,
                overflow: "hidden",
              }}
            >
              <View onLayout={this.onTextLayout}>
                <ConceptsList key={1} conceptsIds={conceptsIds} />
              </View>
            </Animated.View>
          </Animated.ScrollView>
        </View>
      );
    }
  }
}
// TODO: clean
const mapStateToProps = (
  { meals: { userMealsData, mealOnAnalyser, activeMealId } },
  { mealId },
) => ({
  activeMealId,
  meal: mealOnAnalyser._id === mealId ? mealOnAnalyser : userMealsData[mealId],
  conceptsIds: (mealOnAnalyser._id === mealId
    ? mealOnAnalyser.concepts
    : userMealsData[mealId] && userMealsData[mealId].concepts
  ).slice(0, 5),
});

UnconnectedDnaShadowContainer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  border: PropTypes.number,
  radius: PropTypes.number,
  opacity: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  style: ViewPropTypes.style,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disableShadow: PropTypes.bool,
  animated: PropTypes.bool,
  toggleAnimStatus: PropTypes.func,
};

UnconnectedDnaShadowContainer.defaultProps = {
  width: 1,
  height: 1,
  color: Colors.black,
  border: 2,
  radius: 20,
  opacity: 0.2,
  x: 0,
  y: 0,
  style: defaultRefs.emptyObj,
  containerStyle: defaultRefs.emptyObj,
  disableShadow: false,
  animated: false,
  toggleAnimStatus: defaultRefs.nullFunc,
};

export const DnaShadowContainer = connect(mapStateToProps, { setActiveMealId })(
  UnconnectedDnaShadowContainer,
);
