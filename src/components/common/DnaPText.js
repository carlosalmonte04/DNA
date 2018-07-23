import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { IOS } from "@dnaAssets";

const DEFAULT_SIZES = {
  1: 20,
  2: 18,
  3: 16,
  4: 14
};

export const DnaPText = props => {
  const { size, text, fontSize, fontWeight, fontFamily, color, style } = props;

  const styleToUse = {
    fontSize: fontSize || DEFAULT_SIZES[size],
    fontWeight,
    fontFamily,
    color
  };

  return <Text style={[styleToUse, style]}>{text}</Text>;
};

DnaPText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.number,
  size: PropTypes.number,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  color: PropTypes.string
};

DnaPText.defaultProps = {
  text: "",
  fontSize: 0,
  size: 2,
  fontWeight: "normal",
  fontFamily: IOS ? "Avenir" : "Roboto",
  color: IOS ? "Avenir" : "Roboto"
};
