import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { Colors } from "@dnaAssets";
import { ConceptListItem } from "@dnaCommon";
import {
  Img,
  VIEWABLE_CONTENT_HEIGHT,
  HEADER_AND_STATUS_BAR_HEIGHT
} from "@dnaAssets";

const localStyles = StyleSheet.create({
  listContainer: {
    backgroundColor: Colors.white,
    width: "100%",
    overflow: "hidden"
  },
  contentListContainer: {
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    left: 0,
    right: 0
  },
  conceptsListToggle: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  listTransparentOverlay: {
    backgroundColor: Colors.transparent
  },
  listToggleImg: {}
});

const _renderConceptListItem = ({ item: conceptId }) => (
  <ConceptListItem conceptId={conceptId} />
);

const _keyExtractor = concetpId => concetpId;

class Meal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      conceptsListAnimValue: new Animated.Value(0)
    };

    this.translateYActiveVal = HEADER_AND_STATUS_BAR_HEIGHT;
    this.translateYInactiveVal = VIEWABLE_CONTENT_HEIGHT * 0.6;
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
      useNativeDriver: true
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
      active: !this.state.active
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
    const { conceptsIds } = this.props;
    const { active, conceptsListAnimValue } = this.state;

    const translateY = conceptsListAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.translateYInactiveVal, this.translateYActiveVal]
    });

    return (
      <Animated.View
        style={[
          localStyles.contentListContainer
          // { transform: [{ translateY }] }
        ]}
      >
        <FlatList
          scrollEnabled={active}
          onResponderRelease={this.onFlatListPress}
          ListHeaderComponent={this.renderConceptsListToggle}
          stickyHeaderIndices={[0]}
          data={conceptsIds}
          keyExtractor={_keyExtractor}
          renderItem={_renderConceptListItem}
          style={localStyles.listContainer}
          contentContainerStyle={localStyles.contentListContainer}
        />
        {!active && (
          <TouchableOpacity
            style={[
              localStyles.contentListContainer,
              localStyles.listTransparentOverlay
            ]}
            onPress={this.onFlatListPress}
          />
        )}
      </Animated.View>
    );
  }
}

export { Meal };
