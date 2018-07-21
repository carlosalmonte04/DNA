import React, { Component } from "react";
import {
  StyleSheet,
  Navigator,
  Image,
  View,
  Link,
  Dimensions,
  FlatList,
  ScrollView,
  Easing,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import SwipeALot from "react-native-swipe-a-lot";
import * as Progress from "react-native-progress";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
// import Drawer from 'react-native-drawer-menu';
import {
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Button,
  Text,
  Form,
  Title,
  Item,
  Label,
  List,
  Header,
  ListItem
} from "native-base";
import fetchAllMeals from "../actions/meals/fetchAllMeals";
import resetFoods from "../actions/foods/resetFoods";
import resetMeals from "../actions/meals/resetMeals";
import toggleLoggedIn from "../actions/ui/toggleLoggedIn";
import resetUser from "../actions/users-sessions/resetUser";
import ListDashboard from "./ListDashboard";
import LinearGradient from "react-native-linear-gradient";

const screen = Dimensions.get("window");

class Menu extends Component {
  handleLogOut = date => {
    AsyncStorage.removeItem("token").then(() => {
      this.props.resetFoods();
      this.props.resetMeals();
      this.props.resetUser();
      this.props.toggleLoggedIn(false);
    });
  };

  render() {
    return (
      <Container>
        <LinearGradient
          colors={["#ffffff", "#ffffff", "#e2e6e5"]}
          style={{ flex: 1 }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "flex-start",
              top: 60,
              left: 10
            }}
          >
            <View>
              <Image
                source={require("../assets/img/user-male.png")}
                style={{ height: 40, width: 40, top: 10 }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Bayformance",
                  fontSize: 38,
                  left: 10,
                  top: 10
                }}
              >
                {this.props.user.username}
              </Text>
              <Text
                style={{
                  backgroundColor: "transparent",
                  fontSize: 12,
                  color: "green",
                  left: 8,
                  top: 4
                }}
              >
                {" "}
                View profile
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              top: 100,
              alignSelf: "flex-start",
              left: 15
            }}
          >
            <List>
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 70,
                    width: 300,
                    backgroundColor: "transparent",
                    alignItems: "center"
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("UserInfoForms")
                  }
                >
                  <Icon name="ios-construct-outline" />
                  <Text style={styles.text}> edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 70,
                    width: 300,
                    backgroundColor: "transparent",
                    alignItems: "center"
                  }}
                >
                  <Icon name="ios-add" />
                  <Text style={styles.text}> Hire a Dietitian</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 70,
                  width: 300,
                  backgroundColor: "transparent",
                  alignItems: "center"
                }}
              >
                <Text style={styles.text}> About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 70,
                  width: 300,
                  backgroundColor: "transparent",
                  alignItems: "center"
                }}
                onPress={this.handleLogOut}
              >
                <Text style={styles.text}> Log Out</Text>
              </TouchableOpacity>
            </List>
          </View>
        </LinearGradient>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  listItem: {
    backgroundColor: "transparent"
  },
  text: {
    fontSize: 18,
    fontWeight: "100"
  }
});

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllMeals: () => dispatch(fetchAllMeals()),
    resetFoods: () => dispatch(resetFoods()),
    resetMeals: () => dispatch(resetMeals()),
    resetUser: () => dispatch(resetUser()),
    toggleLoggedIn: bool => dispatch(toggleLoggedIn(bool))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
