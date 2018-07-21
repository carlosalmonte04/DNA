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
  Modal,
  FlatList
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
import toggleSignUpModal from "../../actions/ui/toggleSignUpModal";
import SignUpForm from "../SignUpForm";
import login from "../../actions/users-sessions/login";
import LinearGradient from "react-native-linear-gradient";
import { MealListItem } from "@dnaCommon";
import { Styles } from "@dnaAssets";
const { width, height } = Dimensions.get("window");

class UnconnectedProfileMealsContainer extends Component {
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

  renderItem = ({ item: meal }) => <MealListItem meal={meal} />;

  render() {
    const { allUsermeals } = this.props;
    console.log("ALL LLALL", allUsermeals);
    return (
      <Container style={{ backgroundColor: "blue" }}>
        <FlatList
          data={allUsermeals}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={[
            Styles.fullWidth,
            {
              backgroundColor: "tomato",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }
          ]}
        />
      </Container>
    );
  }
}

function mapStateToProps({ meals: { all: allUsermeals } }) {
  return {
    allUsermeals
  };
}

export const ProfileMealsContainer = connect(
  mapStateToProps,
  { toggleSignUpModal, login }
)(UnconnectedProfileMealsContainer);
