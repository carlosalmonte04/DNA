import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Easing,
  StatusBar,
  ScrollView
} from "react-native";
import { Icon, Text, Label, Button, Content, Container } from "native-base";
import { connect } from "react-redux";
import Counter from "react-native-counter";
import * as Animatable from "react-native-animatable";
import { BlurView } from "react-native-blur";
import * as Progress from "react-native-progress";
import SwipeALot from "react-native-swipe-a-lot";
import { INACTIVE_LIST_HEIGHT } from "./Home/HomeConstants";
import { HEIGHT, WIDTH } from "@dnaAssets";

export default class Preview extends Component {
  handleRetake = () => {
    Alert.alert(
      "Retake Picture",
      "Unsaved results will be permanently erased.",
      [{ text: "Cancel" }, { text: "OK", onPress: this.props.resetAll }],
      { cancelable: true }
    );
  };

  state = {
    countersComplete: false
  };

  handleButtonPress = () => {
    this.props.handleSave();
  };

  handleCounterComplete = () => {
    this.setState({ countersComplete: true });
  };

  _renderMacrosText = () => {
    return (
      <View style={localStyles.row}>
        <View style={localStyles.column}>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>Calories</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="ios-flame-outline"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              {this.props.macros.calorie}
            </Text>
          </View>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>Protein</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="md-ionic"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              {this.props.macros.protein}
            </Text>
          </View>
        </View>
        <View style={localStyles.column}>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>Fat</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="ios-flower-outline"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              {this.props.macros.fat}
            </Text>
          </View>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>carbs</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="ios-ice-cream-outline"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              {this.props.macros.carbohydrate}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _renderMicros = () => {
    let microsHTML = [];
    for (key in this.props.micros) {
      microsHTML.push(
        <View key={key} style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ display: "flex", fontSize: 16, fontWeight: "200" }}>
            {key}
          </Text>
          <Text style={{ display: "flex", fontSize: 16, fontWeight: "200" }}>
            {`${this.props.micros[key]["value"]} ${
              this.props.micros[key]["unit"]
            }`}
          </Text>
        </View>
      );
    }

    return <View>{microsHTML}</View>;
  };

  _renderMacrosCounters = () => {
    return (
      <View style={localStyles.row}>
        <View style={localStyles.column}>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>Calories</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="ios-flame-outline"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              <Counter
                end={this.props.macros.calorie}
                start={this.calorieBefore || 0}
                time={1000}
                countBy={10}
              />
            </Text>
          </View>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>Protein</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="md-ionic"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              <Counter
                end={this.props.macros.protein}
                start={this.proteinBefore || 0}
                time={1000}
                countBy={10}
              />
            </Text>
          </View>
        </View>
        <View style={localStyles.column}>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>Fat</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="ios-flower-outline"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              <Counter
                end={this.props.macros.fat}
                start={this.fatBefore || 0}
                time={1000}
                countBy={10}
              />
            </Text>
          </View>
          <View style={localStyles.macroContainer}>
            <Label style={localStyles.label}>carbs</Label>
            <Text style={localStyles.macro}>
              <Icon
                name="ios-ice-cream-outline"
                style={[localStyles.icon, { color: "#686d6f" }]}
              />
              <Counter
                end={this.props.macros.carbohydrate}
                start={this.carbohydrateBefore || 0}
                time={1000}
                countBy={10}
                onComplete={this.handleCounterComplete}
              />
            </Text>
          </View>
        </View>
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.macros.calorie !== nextProps.macros.calorie) {
      this.calorieBefore = this.props.macros.calorie;
      this.setState({ countersComplete: false });
    }
    if (this.props.macros.protein !== nextProps.macros.protein) {
      this.proteinBefore = this.props.macros.protein;
      this.setState({ countersComplete: false });
    }
    if (this.props.macros.fat !== nextProps.macros.fat) {
      this.fatBefore = this.props.macros.fat;
      this.setState({ countersComplete: false });
    }
    if (this.props.macros.carbohydrate !== nextProps.macros.carbohydrate) {
      this.carbohydrateBefore = this.props.macros.carbohydrate;
      this.setState({ countersComplete: false });
    }
  }

  render() {
    console.log(`HEIGHT - INACTIVE_LIST_HEIGHT`, HEIGHT - INACTIVE_LIST_HEIGHT);
    if (this.props.previewVisible) {
      return (
        <View style={localStyles.container}>
          <Image
            source={{ uri: this.props.pictureOnAnalyser }}
            style={localStyles.image}
          />
          <View style={[localStyles.boxContainer, localStyles.shadow]}>
            <SwipeALot>
              <View>
                {this.state.countersComplete
                  ? this._renderMacrosText()
                  : this._renderMacrosCounters()}
              </View>
              <ScrollView style={{ width: "100%" }}>
                {this._renderMicros()}
              </ScrollView>
            </SwipeALot>
            <View style={[localStyles.buttonsContainer]}>
              <Button
                block
                light
                onPress={this.handleRetake}
                style={[
                  localStyles.button,
                  {
                    alignSelf: "flex-end",
                    backgroundColor: "#e4c271",
                    width: 90
                  }
                ]}
              >
                <Text style={localStyles.buttonText}>retake</Text>
              </Button>
              <Button
                block
                light
                onPress={this.handleButtonPress}
                style={[localStyles.button, { alignSelf: "flex-end" }]}
              >
                <Text style={localStyles.buttonText}>Save</Text>
              </Button>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={localStyles.container}
          onPress={this.handleRetake}
        >
          <Image
            source={{ uri: this.props.pictureOnAnalyser }}
            style={localStyles.image}
          />
        </TouchableOpacity>
      );
    }
  }
}

console.log(`HEIGHT - INACTIVE_LIST_HEIGHT`, HEIGHT - INACTIVE_LIST_HEIGHT);

const localStyles = StyleSheet.create({
  container: {
    flex: 0.6,
    width: "100%"
  },
  boxContainer: {
    flex: 0.65,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#e4c271",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    width: "75%"
  },
  infoContainer: {
    flex: 0.7
  },
  row: {
    position: "absolute",
    flex: 1.7,
    flexDirection: "row",
    top: 25,
    width: "77%",
    alignSelf: "center"
  },
  column: {
    flex: 0.5,
    flexDirection: "column",
    marginLeft: 10
  },
  macroContainer: {
    flex: 0.5,
    alignItems: "flex-start"
  },
  icon: {
    flex: 0.5,
    top: 40
  },
  macro: {
    flex: 0.5,
    fontSize: 32,
    fontWeight: "300"
  },
  label: {
    flex: 0.2,
    fontSize: 14,
    backgroundColor: "transparent"
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: -1,
      height: 1
    }
  },
  buttonsContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#8cba92",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: -1,
      height: 3
    },
    height: 40,
    width: 90,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center"
  },
  image: {
    flex: 1,
    width: "100%"
  }
});
