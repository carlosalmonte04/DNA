import React from "react";
import { View } from "react-native";
import { Container } from "react-native-common-lib";
import {
  DnaHeader,
  ProfileInfoContainer,
  ProfileMealsContainer
} from "@dnaComponents";
import { Styles } from "@dnaAssets";

export const UserProfile = () => {
  return (
    <Container style={[Styles.flexNull, Styles.fullScreen]}>
      <DnaHeader
        leftElementToggle=""
        leftElementAction=""
        middleElementToggle=""
        middleElementAction=""
        rightElementToggle=""
        rightElementAction=""
      />
      <ProfileInfoContainer location="UserProfile" />
      <ProfileMealsContainer />
    </Container>
  );
};
