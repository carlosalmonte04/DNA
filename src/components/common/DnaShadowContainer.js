/*
  eslint
  react/no-unused-prop-types: 0
  react/no-typos: 0
*/
import React from "react";
import {
  View,
  ViewPropTypes,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Image,
  StyleSheet
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
  Styles
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
  style
}) => ({
  width,
  height,
  color,
  border,
  radius,
  opacity,
  x,
  y,
  style
});

const createAnimation = (
  value,
  toValue,
  duration,
  easing = Easing.elastic(0.7),
  delay = 0,
  useNativeDrive
) => {
  return Animated.timing(value, {
    toValue,
    duration: duration || 700,
    easing,
    delay,
    useNativeDrive
  });
};

const localStyles = StyleSheet.create({
  heartIcon: {
    position: "absolute",
    right: IOSX ? 32 : 16,
    top: IOSX ? 32 : 16,
    resizeMode: "contain",
    width: 25,
    height: 25
  },
  mealInfoContainer: {
    position: "absolute",
    paddingBottom: IOSX ? 64 : 32,
    paddingHorizontal: IOSX ? 64 : 32,
    bottom: 0
  },
  mealName: {
    lineHeight: null
  },
  locationIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  conceptsPreviewContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

class UnconnectedDnaShadowContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animEnded: false
    };
    this._animVal = new Animated.Value(0);
  }

  _animPictureToTop = () => {
    this.setState({ animEnded: true }, () => {
      createAnimation(
        this._animVal,
        1,
        null,
        undefined,
        null,
        1000,
        true
      ).start();
      this.props.setActiveMealId(this.props.mealId);
    });
  };

  _animPictureToCenter = () => {
    this.props.setActiveMealId("");
    createAnimation(this._animVal, 0, null, undefined, null, null, true).start(
      () => this.setState({ animEnded: false })
    );
  };

  toggleAnimVal = () => {
    if (this.props.parentScrollView) {
      const scrollview = this.props.parentScrollView.getNode();
      scrollview.scrollTo({
        x: 0,
        y: this.state.posY,
        animated: true
      });

      console.log(`this.state.posY`, this.state.posY);

      if (this.state.animEnded) {
        this._animPictureToCenter();
        this.props.toggleAnimStatus("atCenter");
      } else {
        this._animPictureToTop();
        this.props.toggleAnimStatus("atTop");
      }
    }
  };

  onLayout = ({
    nativeEvent: {
      layout: { y }
    }
  }) => {
    if (this.state.layedOut) {
      return null;
    }

    this.setState({
      posY: y,
      layedOut: true
    });
    return;
  };

  renderMealName = () => {
    if (!this.props.meal.name) {
      return null;
    }

    return (
      <DnaHText
        bold
        size={1}
        color={Colors.white}
        text={truncate(this.props.meal.name, { length: 14 })}
        style={localStyles.mealName}
      />
    );
  };

  renderMealLocation = () => {
    return (
      <View style={localStyles.locationContainer}>
        <Image source={Icons.whiteLocation} style={localStyles.locationIcon} />
        <DnaPText color={Colors.white} text="McDonalds, @ Bronx, NY" size={4} />
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

  render() {
    const {
      children,
      containerStyle,
      disableShadow,
      animated,
      conceptsIds
    } = this.props;

    console.log(`Shadow - `, conceptsIds);

    const height = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [HEIGHT * 0.75, HEIGHT * 0.4]
    });

    const width = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [WIDTH * 0.9, WIDTH]
    });

    const top = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [DEFAULT_HEADER_HEIGHT, 0]
    });

    const borderRadius = this._animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });

    const shadowOpt = _mapPropsToShawoOptions(this.props);

    if (disableShadow) {
      return (
        <View style={[containerStyle, { height, width }]}>{children}</View>
      );
    }

    if (animated) {
      return (
        <View onLayout={this.onLayout}>
          <TouchableWithoutFeedback onPress={this.toggleAnimVal}>
            <Animated.View
              style={[containerStyle, { height, width, borderRadius }]}
            >
              {children}
              <View style={localStyles.mealInfoContainer}>
                {this.renderMealName()}
                {this.renderMealLocation()}
                {this.renderConceptsPreview()}
              </View>
              <Image source={Icons.whiteHeart} style={localStyles.heartIcon} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    return (
      <View style={containerStyle}>
        <BoxShadow setting={shadowOpt}>{children}</BoxShadow>
      </View>
    );
  }
}
// TODO: clean
const mapStateToProps = (
  { meals: { userMealsData, mealOnAnalyser } },
  { mealId }
) => ({
  meal: mealOnAnalyser._id === mealId ? mealOnAnalyser : userMealsData[mealId],
  conceptsIds: (mealOnAnalyser._id === mealId
    ? mealOnAnalyser.concepts
    : userMealsData[mealId] && userMealsData[mealId].concepts
  ).slice(0, 5)
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
  toggleAnimStatus: PropTypes.func
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
  toggleAnimStatus: defaultRefs.nullFunc
};

export const DnaShadowContainer = connect(mapStateToProps, { setActiveMealId })(
  UnconnectedDnaShadowContainer
);
