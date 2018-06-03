import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ListItem,
  TouchableOpacity
} from "react-native";
import { Icon, Text, Label, Button, Content, Container } from "native-base";
import { connect } from "react-redux";

import moment from "moment";
import { User } from "@dnaModels";
import * as Animatable from "react-native-animatable";
import { BlurView } from "react-native-blur";
import * as Progress from "react-native-progress";
import LinearGradient from "react-native-linear-gradient";
import toggleSignUpFormCompleted from "../actions/ui/toggleSignUpFormCompleted";
import toggleSignUpModal from "../actions/ui/toggleSignUpModal";

const screen = Dimensions.get("window");

class Assessment extends Component {
  nextPreprocess = () => {
    this.props.nextFn();
  };

  render() {
    const user = User.all()[0];
    return (
      <LinearGradient
        colors={["#8234FF", "#8234FF", "#6b2ad6"]}
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          height: screen.height
        }}
      >
        <View style={{ margin: 0 }}>
          <View
            style={{
              borderWidth: 6,
              backgroundColor: "transparent",
              margin: 40
            }}
          >
            <LinearGradient colors={["#401a82", "#401a82", "#4a1c9f"]}>
              <Text style={styles.regular}>
                Based on our assessment your BMI is
                <Text style={styles.highlighted}>
                  {" "}
                  22.3<Text style={[styles.highlighted, { fontSize: 18 }]}>
                    kg/m2
                  </Text>
                </Text>
                <Text style={styles.regular}>
                  {" "}
                  You're at
                  <Text style={styles.highlighted}>
                    {" "}
                    97<Text style={[styles.highlighted, { fontSize: 18 }]}>
                      %
                    </Text>{" "}
                  </Text>
                  of ideal body weight
                  <Text style={styles.highlighted}>
                    {" "}
                    180<Text style={[styles.highlighted, { fontSize: 18 }]}>
                      lbs
                    </Text>{" "}
                  </Text>
                </Text>
              </Text>
            </LinearGradient>
          </View>
          <View style={{ margin: 30, marginTop: 0 }}>
            <View
              style={{
                borderWidth: 6,
                borderColor: "#2a555e",
                height: screen.height / 3
              }}
            >
              <BlurView
                blurType={"light"}
                blurAmount={2}
                style={[
                  { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }
                ]}
              />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[styles.highlighted, { color: "black", fontSize: 48 }]}
                >
                  Requirements
                </Text>
                <Text
                  style={[
                    styles.highlighted,
                    { color: "#87ff70", fontSize: 18, bottom: 8 }
                  ]}
                >
                  Based on your goals and health status
                </Text>
              </View>
              <View style={{ bottom: 0 }}>
                <Text style={[styles.regular, { color: "black" }]}>
                  Calories: 2000 kcal
                </Text>
                <Text style={[styles.regular, { color: "black" }]}>
                  Protein: 78 g
                </Text>
                <Text style={[styles.regular, { color: "black" }]}>
                  Fat: 30 g
                </Text>
                <Text style={[styles.regular, { color: "black" }]}>
                  carbohydrate: 130 g
                </Text>
              </View>
            </View>
          </View>
          <Animatable.View animation={"fadeIn"}>
            <Button
              block
              light
              onPress={this.nextPreprocess}
              style={[
                styles.button,
                {
                  alignSelf: "flex-end",
                  backgroundColor: "#39b830",
                  width: "100%",
                  height: "30%"
                }
              ]}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Bayformance",
                  fontSize: 24,
                  textAlign: "center"
                }}
              >
                proceed
              </Text>
            </Button>
          </Animatable.View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  regular: {
    backgroundColor: "transparent",
    textAlign: "center",
    fontFamily: "Bayformance",
    fontSize: 28,
    color: "#7caaf0"
  },
  highlighted: {
    fontFamily: "Bayformance",
    fontSize: 38,
    color: "#fd623a",
    backgroundColor: "transparent"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    toggleSignUpFormCompleted: bool =>
      dispatch(toggleSignUpFormCompleted(bool)),
    toggleSignUpModal: () => dispatch(toggleSignUpModal())
  };
}

export default connect(null, mapDispatchToProps)(Assessment);
