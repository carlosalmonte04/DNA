import React from "react";
import { Image, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { Colors } from "@dnaAssets";

const localStyles = StyleSheet.create({
  defaultImageStyle: {
    borderWidth: 1,
    borderColor: "white"
  }
});

export const DnaImage = props => {
  console.log("props", props.style);
  return (
    <FastImage {...props} style={[props.defaultImageStyle, props.style]} />
  );
};
