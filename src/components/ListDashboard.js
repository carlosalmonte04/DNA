import React, { Component } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  List,
  ListItem,
  Button,
  ListView,
  Text,
  Icon,
  Input,
  Label
} from "native-base";
import moment from "moment";

import changeDisplayingMeal from "../actions/ui/changeDisplayingMeal";
import ListRowDashboardFront from "./ListRowDashboardFront";
import ListRowDashboardBehind from "./ListRowDashboardBehind";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";

import * as Animatable from "react-native-animatable";

const NUTRIENT_ID = {
  energy: 208,
  protein: 203,
  fat: 204,
  carbohydrate: 205
};

const screen = Dimensions.get("window");

const ListDashboard = props => {
  handlePress = () => {
    props.changeDisplayingMeal(props.meal);
  };

  _renderMacrosContainer = () => {
    return (
      <View>
        <View style={styles.macrosContainer}>
          <Text style={[styles.macro]}>
            <Icon
              name="ios-flash-outline"
              style={{ fontSize: 40, color: "#7c4a31" }}
            />
            {parseInt(props.meal.macros().calorie)}
          </Text>
          <Text style={[styles.macro]}>
            <Icon
              name="ios-ionic-outline"
              style={{ fontSize: 40, color: "#38387d" }}
            />{" "}
            {parseInt(props.meal.macros().protein)}
          </Text>
        </View>
        <View style={styles.macrosContainerRight}>
          <Text style={[styles.macro]}>
            <Icon
              name="ios-flower-outline"
              style={{ fontSize: 40, color: "#c3b042" }}
            />{" "}
            {parseInt(props.meal.macros().fat)}
          </Text>
          <Text style={[styles.macro]}>
            <Icon
              name="ios-ice-cream-outline"
              style={{ fontSize: 40, color: "#7c3c4e" }}
            />{" "}
            {parseInt(props.meal.macros().carbohydrate)}
          </Text>
        </View>
      </View>
    );
  };

  _renderName = meal => {
    const hour = parseInt(moment(meal.createAt).format("kk"));

    if (hour < 9) {
      return "Breakfast";
    } else if (hour >= 9 && hour < 11) {
      return "Morning snack";
    } else if (hour >= 11 && hour < 14) {
      return "Lunch";
    } else if (hour >= 14 && hour < 18) {
      return "Afternoon Snack";
    } else if (hour >= 18 && hour <= 22) {
      return "Dinner";
    } else {
      return "No name";
    }
  };

  return (
    <View style={{ top: 10 }}>
      <TouchableOpacity
        underlayColor={"white"}
        onPress={handlePress}
        style={{
          height: 130,
          backgroundColor: "white",
          bottom: 8,
          margin: 1,
          borderRadius: 5
        }}
      >
        <View style={styles.list}>
          <Image
            source={{ uri: props.meal.pictureUrl }}
            style={{
              height: 70,
              width: 70,
              borderRadius: 100 / 3,
              alignSelf: "center",
              left: 10
            }}
          />
          <View
            style={{
              alignItems: "flex-start",
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-start",
              paddingLeft: 15
            }}
          >
            <View style={{ top: 30, left: 10, alignItems: "flex-start" }}>
              <Text style={styles.foodName}>{_renderName(props.meal)}</Text>
              <View style={[styles.macrosContainer, { bottom: 8 }]}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.macro, { position: "absolute" }]}>
                    <Icon
                      name="ios-flash-outline"
                      style={{ fontSize: 22, color: "#7c4a31" }}
                    />{" "}
                    {parseInt(props.meal.macros().calorie)}
                  </Text>
                  <Text
                    style={[styles.macro, { position: "absolute", left: 60 }]}
                  >
                    <Icon
                      name="ios-ionic-outline"
                      style={{ fontSize: 22, color: "#38387d" }}
                    />{" "}
                    {parseInt(props.meal.macros().protein)}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.macro,
                      { position: "absolute", left: 60, top: 25 }
                    ]}
                  >
                    <Icon
                      name="ios-flower-outline"
                      style={{ fontSize: 22, color: "#c3b042" }}
                    />{" "}
                    {parseInt(props.meal.macros().fat)}
                  </Text>
                  <Text
                    style={[styles.macro, { position: "absolute", top: 25 }]}
                  >
                    <Icon
                      name="ios-ice-cream-outline"
                      style={{ fontSize: 22, color: "#7c3c4e" }}
                    />{" "}
                    {parseInt(props.meal.macros().carbohydrate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "green",
    margin: 1,
    transform: [{ scale: 1.05 }],
    height: 80
  },
  notSelected: { margin: 1, height: 80 },
  list: { flex: 1, flexDirection: "row", paddingLeft: 15 },
  behindList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 22,
    paddingTop: 7,
    height: 80
  },
  nameAndGroupContainer: {
    alignSelf: "flex-end",
    flex: 1,
    flexDirection: "column",
    top: 0,
    backgroundColor: "transparent"
  },
  foodName: {
    fontSize: 22,
    fontWeight: "200",
    backgroundColor: "transparent",
    color: "#383857"
  },
  optionName: {
    alignItems: "flex-start",
    fontSize: 10,
    fontWeight: "100",
    backgroundColor: "transparent"
  },
  macrosContainer: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    alignItems: "flex-start",
    bottom: 10,
    left: -5
  },
  macrosContainerLeft: {
    alignItems: "flex-end",
    flexDirection: "row",
    paddingRight: 10,
    paddingTop: 5
  },
  macrosContainerRight: {
    alignItems: "flex-end",
    flexDirection: "row",
    paddingRight: 10,
    paddingTop: 5
  },
  macro: {
    fontSize: 18,
    fontWeight: "100",
    padding: 5,
    marginBottom: -10,
    backgroundColor: "transparent"
  },
  calorie: { position: "absolute", left: -106, top: -8, color: "red" },
  protein: { position: "absolute", left: -38, top: -8, color: "blue" },
  fat: { position: "absolute", left: -106, top: 24, color: "yellow" },
  carbohydrate: { position: "absolute", left: -38, top: 24, color: "pink" }
});

function mapDispatchToProps(dispatch) {
  return {
    changeDisplayingMeal: meal => dispatch(changeDisplayingMeal(meal))
  };
}

export default ListDashboard;
