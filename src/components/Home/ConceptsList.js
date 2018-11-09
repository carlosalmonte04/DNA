import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { ConceptListItem } from "@dnaCommon";
import {
  Img,
  Colors,
  VIEWABLE_CONTENT_HEIGHT,
  HEADER_AND_STATUS_BAR_HEIGHT,
} from "@dnaAssets";

const localStyles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white,
    width: "100%",
  },
  contentListContainer: {
    width: "100%",
    paddingTop: 15,
    backgroundColor: Colors.white,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    // bottom: 0,
    // left: 0,
    // right: 0
  },
  conceptsListToggle: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  listTransparentOverlay: {
    backgroundColor: Colors.transparent,
  },
  listToggleImg: {},
});

const _renderConceptListItem = ({ item: conceptId }, index) => (
  <ConceptListItem conceptId={conceptId} index={index} />
);

const _keyExtractor = concetpId => concetpId;

class ConceptsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      conceptsListAnimValue: new Animated.Value(0),
    };

    this.translateYActiveVal = HEADER_AND_STATUS_BAR_HEIGHT;
    this.translateYInactiveVal = VIEWABLE_CONTENT_HEIGHT * 0.6;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { activeMealId } = this.props;
    const { activeMealId: nextActiveMealId } = nextProps;
    if (activeMealId !== nextActiveMealId) {
      return true;
    }
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    const { active } = this.state;
    const { active: nextActive } = nextState;

    if (!active && nextActive) {
      this.animConceptsList("up");
    }

    if (active && !nextActive) {
      this.animConceptsList("down");
    }
  }

  hideConceptsList = () => {
    this.setState({ active: false });
  };

  animConceptsList = direction =>
    Animated.timing(this.state.conceptsListAnimValue, {
      toValue: direction === "up" ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

  onConceptsListSwipe = gestureName => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        console.log("SWIPE_UP");
        break;
      case SWIPE_DOWN:
        console.log("SWIPE_DOWN");
        this.hideConceptsList();
        break;
      case SWIPE_LEFT:
        console.log("SWIPE_LEFT");
        break;
      case SWIPE_RIGHT:
        console.log("SWIPE_RIGHT");
        break;
    }
  };

  onFlatListPress = () => {
    if (this.state.active) {
      return null;
    }

    this.setState({
      active: !this.state.active,
    });
  };

  renderConceptsListToggle = () => (
    <GestureRecognizer
      onSwipe={this.onConceptsListSwipe}
      style={localStyles.conceptsListToggleContainer}
    >
      <TouchableOpacity
        style={localStyles.conceptsListToggle}
        onPress={this.hideConceptsList}
      >
        <Image
          style={localStyles.listToggleImg}
          source={this.state.active ? Img.grayDownArrow : Img.grayUpArrow}
        />
      </TouchableOpacity>
    </GestureRecognizer>
  );

  render() {
    const { conceptsIds, onConceptsLayout} = this.props;
    const { active, conceptsListAnimValue } = this.state;

    return (
      <FlatList
        onLayout={onConceptsLayout}
        scrollEnabled={active}
        onResponderRelease={this.onFlatListPress}
        data={conceptsIds}
        keyExtractor={_keyExtractor}
        renderItem={_renderConceptListItem}
        style={localStyles.listContainer}
      />
    );
  }
}

export { ConceptsList };
