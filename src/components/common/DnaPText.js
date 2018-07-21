import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { IOS } from "@dnaAssets";

export const DnaPText = props => {
  const { text, fontSize, fontWeight, fontFamily } = props;

  const styleToUse = {
    fontSize,
    fontWeight,
    fontFamily
  };

  return <Text style={styleToUse}>{text}</Text>;
};

DnaPText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string
};

DnaPText.defaultProps = {
  text: "",
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: IOS ? "Avenir" : "Roboto"
};
