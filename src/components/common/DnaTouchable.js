import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import { debounce } from "underscore";

class UnconnectedDnaTouchable extends React.PureComponent {
  componentDidMount() {
    if (this.props.isDisabled && this.touchableOpacity) {
      if (this.touchableOpacity) {
        this.touchableOpacity.setOpacityTo(0.3, 200);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { isDisabled, isLoading } = this.props;
    const {
      isDisabled: willBeDisabled,
      isLoading: willBeLoading,
      shouldHaveNoFeedback
    } = nextProps;

    if (!shouldHaveNoFeedback && isDisabled && !willBeDisabled) {
      this.touchableOpacity.setOpacityTo(1, 200);
    } else if (
      !shouldHaveNoFeedback &&
      !isDisabled &&
      (willBeDisabled || willBeLoading)
    ) {
      this.touchableOpacity.setOpacityTo(0.3, 200);
    } else if (!shouldHaveNoFeedback && isLoading && !willBeLoading) {
      this.touchableOpacity.setOpacityTo(1, 200);
    }
  }

  onPressWithDebounce = debounce(this.props.onPress, 500, true);

  handlePress = () => {
    const { isLoading, isDebounce, onPress } = this.props;

    if (!isLoading) {
      if (isDebounce) {
        this.onPressWithDebounce();
      } else {
        onPress();
      }
    }
  };

  handleNullOnpress = () => {
    console.log(`NULL PRESS`);
    // If loading make sure opacity remains faded (0.3)... It changes to opacity 1 otherwise
    if (this.touchableOpacity.setOpacityTo) {
      this.touchableOpacity.setOpacityTo(0.3, 1);
    }
  };

  render() {
    const {
      isDisabled,
      shouldHaveNoFeedback,
      isHeaderNav,
      isSilentLoading
    } = this.props;

    if (shouldHaveNoFeedback) {
      return (
        <TouchableWithoutFeedback
          {...this.props}
          onPress={
            isDisabled || isSilentLoading
              ? this.handleNullOnpress
              : this.handlePress
          }
        >
          <View {...this.props}>{this.props.children}</View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableOpacity
        ref={el => {
          this.touchableOpacity = el;
        }}
        activeOpacity={isDisabled ? 0.3 : 0.7}
        {...this.props}
        onPress={
          isDisabled || isSilentLoading
            ? this.handleNullOnpress
            : this.handlePress
        }
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

UnconnectedDnaTouchable.propTypes = {
  isLoading: PropTypes.bool,
  isSilentLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isDebounce: PropTypes.bool,
  shouldHaveNoFeedback: PropTypes.bool,
  onPress: PropTypes.func.isRequired
};

UnconnectedDnaTouchable.defaultProps = {
  isLoading: false,
  isSilentLoading: false,
  isDisabled: false,
  isDebounce: false,
  shouldHaveNoFeedback: false
};

export const DnaTouchable = connect()(UnconnectedDnaTouchable);
