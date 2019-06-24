import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import applyAppStateListener from 'redux-enhancer-react-native-appstate';

import { DEV } from 'config/config';
import modelsMiddleware from 'models/middleware';

import combinedReducers, { reducers } from 'redux/reducers';

import { getNavMiddleware } from 'redux/navigation/middleware';

console.log('i run second');

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const navMiddleware = getNavMiddleware();

const middlewares = [navMiddleware, thunk, modelsMiddleware];

const configureStore = () => {
  const store = createStore(
    combinedReducers,
    {},
    composeEnhancers(applyAppStateListener(), applyMiddleware(...middlewares)),
  );
  // const persistor = persistStore(store);

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      store.replaceReducer(reducers);
    });
  }

  return store;
};

export default configureStore();
