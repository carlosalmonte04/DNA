import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';

import { devFlags } from 'config/env';
import store from 'redux/store';

import App from './App';

class DNA extends Component {
  constructor(props) {
    super(props);
    this.persistor = persistStore(store, null, undefined);
    if (devFlags.purgeAllData) {
      this.persistor.purge();
    }
    this.state = {
      rehydrated: false,
    };
  }

  persistor = null;

  render() {
    const { rehydrated } = this.state;
    return (
      <Provider store={store}>
        <PersistGate persistor={this.persistor} loading={null}>
          <App rehydrated={rehydrated} />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('DNA', () => DNA);
