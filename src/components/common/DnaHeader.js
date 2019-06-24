import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defaultRefs } from 'config/env';

const { nullfunc } = defaultRefs;

export const UnconnectedDnaHeader = props => {
  const {
    leftElementToggle,
    leftElementAction,
    middleElementToggle,
    middleElementAction,
    rightElementToggle,
    rightElementAction,
  } = props;

  return (
    <View>
      <Image source={leftElementToggle} />
      <Image source={middleElementToggle} />
      <Image source={rightElementToggle} />
    </View>
  );
};

export const DnaHeader = connect()(UnconnectedDnaHeader);

UnconnectedDnaHeader.propTypes = {
  leftElementAction: PropTypes.function,
  middleElementAction: PropTypes.function,
  rightElementAction: PropTypes.function,
};

UnconnectedDnaHeader.defaultProps = {
  leftElementToggle: null, // image
  leftElementAction: nullfunc,
  middleElementToggle: null,
  middleElementAction: nullfunc,
  rightElementToggle: null,
  rightElementAction: nullfunc,
};
