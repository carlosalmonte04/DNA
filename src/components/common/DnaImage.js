import React from "react";
import {
  Image,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import FastImage from "react-native-fast-image";
import { Colors } from "@dnaAssets";

const localStyles = StyleSheet.create({
  defaultImageStyle: {}
});

export const DnaImage = props => {
  if (props.children) {
    return (
      <ImageBackground
        {...props}
        style={[localStyles.defaultImageStyle, props.style]}
      >
        {props.children}
      </ImageBackground>
    );
  }
  if (props.animated) {
    return (
      <Animated.Image
        {...props}
        style={[localStyles.defaultImageStyle, props.style]}
      />
    );
  }
  return (
    <FastImage
      {...props}
      style={[localStyles.defaultImageStyle, props.style]}
    />
  );
};
