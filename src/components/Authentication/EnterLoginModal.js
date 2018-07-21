import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Navigator,
  Image,
  View,
  Link,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Modal
} from "react-native";
import {
  Container,
  Content,
  InputGroup,
  Input,
  Icon,
  Button,
  Text,
  Form,
  Header,
  Title,
  Item,
  Label
} from "native-base";
import { Jiro } from "react-native-textinput-effects";
import SignUpForm from "../SignUpForm";
import { DEV } from "@dnaConfig";
import { login, toggleSignUpModal } from "@dnaActions";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

class UnconnectedEnterLoginModal extends Component {
  state = {
    username: DEV ? "vacarlos" : "",
    password: DEV ? "258456Cc" : ""
  };

  handleSubmit = () => {
    this.props.login({ ...this.state });
  };

  handleSignUpPress = () => {
    this.props.toggleSignUpModal();
  };

  handleUsernameChange = username => {
    this.setState({ username: username });
  };

  handlePasswordChange = password => {
    this.setState({ password: password });
  };

  render() {
    const { visible, onRequestClose } = this.props;
    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <LinearGradient
          colors={["#7EB9F8", "#7EB9F8", "#7EB9F8"]}
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/img/logo.png")}
              style={{ alignSelf: "center" }}
              resizeMode={"cover"}
            />
          </View>
          <Form style={styles.form}>
            <Jiro
              label={"username"}
              // this is used as active and passive border color
              borderColor={"#d7e1e7"}
              labelStyle={{ fontWeight: "100", fontSize: 22, color: "#d8e2e8" }}
              inputStyle={{ color: "#666765" }}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={this.handleUsernameChange}
              value={this.state.username}
            />
            <Jiro
              label={"password"}
              // this is used as active and passive border color
              borderColor={"#d7e1e7"}
              labelStyle={{ fontWeight: "300", fontSize: 22, color: "#d7e1e7" }}
              inputStyle={{ color: "#666765" }}
              secureTextEntry={true}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
            />

            <View style={{ alignSelf: "flex-end", margin: 10 }}>
              <Text style={styles.link}>Forgot password</Text>
            </View>
            <View>
              <Button
                block
                light
                onPress={this.handleSubmit}
                style={styles.button}
              >
                <Text
                  style={{ color: "white", fontWeight: "400", fontSize: 20 }}
                >
                  Log In
                </Text>
              </Button>
              <View
                style={{
                  alignItems: "flex-end",
                  alignSelf: "center",
                  margin: 10,
                  flexDirection: "row",
                  top: 30
                }}
              >
                <Text
                  style={{ color: "black", backgroundColor: "transparent" }}
                >
                  Not signed up yet?&nbsp;
                </Text>
                <TouchableOpacity onPress={this.handleSignUpPress}>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Form>
        </LinearGradient>
        {/*        <Modal
          ref={"signUpModal"}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          onClosed={this.props.toggleSignUpModal}
          isOpen={!!false}
        >
          <SignUpForm navigation={this.props.navigation} />
        </Modal>*/}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Verdana",
    marginBottom: 10,
    color: "#595856"
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  bg: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: "80%",
    alignSelf: "center",
    bottom: 60
  },
  input: {
    backgroundColor: "transparent",
    borderColor: "white",
    marginTop: 10
  },
  button: {
    backgroundColor: "#E3B041",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: -3,
      height: 10
    },
    width: "100%",
    height: 60,
    top: 30
  },
  link: {
    color: "#E3B041",
    fontWeight: "500",
    backgroundColor: "transparent"
  }
});

// function mapDispatchToProps(dispatch) {
//   return {
//     toggleSignUpModal: () => dispatch(toggleSignUpModal()),
//     login: userInfo => dispatch(login(userInfo))
//   };
// }

function mapStateToProps(state) {
  return {
    signUpShowing: state.ui.signUpModalShowing
  };
}

export const EnterLoginModal = connect(mapStateToProps, {
  toggleSignUpModal,
  login
})(UnconnectedEnterLoginModal);
