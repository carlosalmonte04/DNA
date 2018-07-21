import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { IOS } from "@dnaAssets";

export const DnaHText = props => {
  const { text, fontSize, fontWeight, fontFamily } = props;

  const styleToUse = {
    fontSize,
    fontWeight,
    fontFamily
  };

  return <Text style={styleToUse}>{text}</Text>;
};

DnaHText.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string
};

DnaHText.defaultProps = {
  text: "",
  fontSize: 18,
  fontWeight: "bold",
  fontFamily: IOS ? "Avenir" : "Roboto"
};
