import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';

import { store } from '@dnaStore';
import { devFlags } from '@dnaConfig';

import App from './App';

console.log('***Store - store', store);

console.disableYellowBox = true;

// polyfill to fix clarifai error
if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;

class DNA extends Component {
  constructor(props) {
    super(props);

    this._persistor = persistStore(store, null, undefined);

    if (devFlags.purgeAllData) {
      this._persistor.purge();
    }

    this.state = {
      rehydrated: false,
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

AppRegistry.registerComponent('DNA', () => DNA);
