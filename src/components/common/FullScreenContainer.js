import React from "react";
import { View, StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "@dnaAssets";

const localStyles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: "blue"
  }
});
export const FullScreenContainer = props => (
  <View style={localStyles.container}>{props.children}</View>
);
