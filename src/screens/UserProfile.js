import React from "react";
import { View } from "react-native";
import {
  DnaHeader,
  ProfileInfoContainer,
  ProfileMealsContainer,
  DnaContainer
} from "@dnaComponents";
import { Styles } from "@dnaAssets";

export const UserProfile = () => {
  return (
    <DnaContainer style={[Styles.flexNull, Styles.fullScreen]}>
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
    </DnaContainer>
  );
};
