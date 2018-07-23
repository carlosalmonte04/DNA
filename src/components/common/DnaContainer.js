import React from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { WIDTH, HEIGHT, Img } from "@dnaAssets";

const localStyles = StyleSheet.create({
  screenContainer: {
    flex: 1
  }
});

export const DnaContainer = props => {
  const ViewToUse = props.ScrollView ? Animated.ScrollView : View;
  return (
    <ViewToUse
      {...props}
      ref={el => props.assignRef(el)}
      style={localStyles.screenContainer}
    >
      {props.children}
    </ViewToUse>
  );
};
