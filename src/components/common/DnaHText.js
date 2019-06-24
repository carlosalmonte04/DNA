import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { IOS } from 'config/config';

const DEFAULT_SIZES = {
  1: 30,
  2: 28,
  3: 24,
  4: 20,
};

export const DnaHText = props => {
  const {
    size,
    bold,
    text,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    style,
  } = props;

  const styleToUse = {
    fontSize: fontSize || DEFAULT_SIZES[size],
    fontWeight: bold ? 'bold' : fontWeight,
    fontFamily,
    color,
  };

  return <Text style={[styleToUse, style]}>{text}</Text>;
};

DnaHText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.number,
  size: PropTypes.number,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
};

DnaHText.defaultProps = {
  text: '',
  fontSize: 0,
  size: 2,
  fontWeight: '500',
  fontFamily: IOS ? 'Raleway' : 'Roboto',
  color: IOS ? 'Raleway' : 'Roboto',
  bold: false,
};
