import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  ListItem,
  TouchableHighlight
} from "react-native";
import { Icon } from "native-base";
import ListAnalyser from "./ListAnalyser";
import moment from "moment";

const screen = Dimensions.get("window");

const Meal = props => {
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

  if (props.meal) {
    return (
      <View style={styles.container}>
        <View>
          <View
            style={{ marginBottom: 10, flexDirection: "row", width: "68%" }}
          >
            <Image
              source={{ uri: props.meal.pictureUrl }}
              style={{ height: 150, width: 150, borderRadius: 10 }}
            />
            <View>
              <Text
                style={{
                  margin: 8,
                  fontSize: 12,
                  fontWeight: "100",
                  alignSelf: "flex-end",
                  left: 30
                }}
              >
                {moment(props.meal.createdAt).format("llll")}
              </Text>
              <Text
                style={{
                  margin: 8,
                  fontSize: 32,
                  fontWeight: "100",
                  alignSelf: "center"
                }}
              >
                {_renderName(props.meal)}
              </Text>
            </View>
          </View>
          <Text
            style={{ fontSize: 32, fontWeight: "100", alignSelf: "center" }}
          >
            Meal Data
          </Text>
          <View
            style={{ marginBottom: 10, backgroundColor: "white", height: 100 }}
          >
            <View>
              <TouchableHighlight>
                <View
                  style={[
                    styles.macrosContainer,
                    { alignSelf: "center", top: 10 }
                  ]}
                >
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
              </TouchableHighlight>
            </View>
          </View>
          <Text
            style={{
              margin: 8,
              fontSize: 32,
              fontWeight: "100",
              alignSelf: "center"
            }}
          >
            Foods
          </Text>
          <View style={{ marginBottom: 10 }}>
            <FlatList
              data={props.meal.foods}
              renderItem={(food, idx) => (
                <ListAnalyser
                  key={food.item.id}
                  meal={props.meal}
                  food={food.item}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "95%",
    margin: 10,
    padding: 10,
    backgroundColor: "#e5e5e5"
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
  }
});

export default Meal;
