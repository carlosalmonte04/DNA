import React from "react";
import { View, StyleSheet } from "react-native";

const localStyles = StyleSheet.create({
  screenContainer: {
    flex: 1
  }
});

export const DnaContainer = props => (
  <View style={localStyles.screenContainer}>{props.children}</View>
);
