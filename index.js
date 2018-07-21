/**
 * Sample React Native DNA
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";

import { StackNavigator } from "react-navigation";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import { store } from "@dnaStore";
import { devFlags } from "@dnaConfig";
import App from "./App";

console.log("***Store - store", store);

console.disableYellowBox = true;

const screen = Dimensions.get("window");

// polyfill to fix clarifai error
if (typeof process === "undefined") process = {};
process.nextTick = setImmediate;

class DNA extends Component {
  constructor(props) {
    super(props);

    this._persistor = persistStore(store, null, this.setRehydrated);

    if (devFlags.purgeAllData) {
      this._persistor.purge();
    }

    this.state = {
      rehydrated: false
    };
  }

  render() {
    const { rehydrated } = this.state;
    return (
      <Provider store={store}>
        <PersistGate persistor={this._persistor} loading={null}>
          <App rehydrated={rehydrated} />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: screen.height,
    width: screen.width
  }
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: token => dispatch(fetchUser(token))
  };
}

export default connect(null, mapDispatchToProps)(DNA);

AppRegistry.registerComponent("DNA", () => DNA);
