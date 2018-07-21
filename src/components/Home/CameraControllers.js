import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors } from "@dnaAssets";
import { startAnalyser } from "@dnaActions";
import { connect } from "react-redux";
import { INACTIVE_LIST_HEIGHT } from "./";

const localStyles = StyleSheet.create({
  shutterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  container: {
    position: "absolute",
    justifyContent: "center",
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 0.4,
    bottom: 0,
    backgroundColor: Colors.white
  }
});

export const UnconnectedCameraControllers = props => {
  const { getCameraRef } = props;
  const takePicture = () => {
    const cameraComponent = getCameraRef();

    if (cameraComponent) {
      cameraComponent
        .capture()
        .then(({ path: picturePath }) => props.startAnalyser(picturePath))
        .catch(err => console.error(err));
    }
  };

  console.log(`INACTIVE_LIST_HEIGHT`, INACTIVE_LIST_HEIGHT);

  return (
    <View style={[localStyles.container, { height: INACTIVE_LIST_HEIGHT }]}>
      <View style={localStyles.shutterContainer}>
        <TouchableOpacity onPress={takePicture}>
          <Image
            source={require("../../assets/img/cameraShutter.png")}
            height={70}
            width={70}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CameraControllers = connect(null, {
  startAnalyser
})(UnconnectedCameraControllers);
