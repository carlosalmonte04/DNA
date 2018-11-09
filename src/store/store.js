import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import applyAppStateListener from "redux-enhancer-react-native-appstate";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import { persistCombineReducers } from "redux-persist";
import { DEV, devFlags, defaultRefs } from "../Config";
import { Reducers } from "@dnaReducers";
import { Meal } from "@dnaModels";
import { navMiddleware } from "../navigation";

const { keepMealOnView } = devFlags;

const mealDependentReducers = ["ui", "foods", "meals"];

const composeEnhancers =
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  DEV
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const config = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["nav"].concat(
    DEV && keepMealOnView ? defaultRefs.emptyArr : mealDependentReducers
  ),
  debounce: 50
};

const mapStateToProps = ({ nav }) => ({
  state: nav
});

const reducer = persistCombineReducers(config, Reducers);

//

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

// export const addListener = createReduxBoundAddListener("root");

const middlewares = [navMiddleware, thunk, Meal.connectDispatch];

const configureStore = () => {
  const store = createStore(
    reducer,
    {},
    composeEnhancers(applyAppStateListener(), applyMiddleware(...middlewares))
  );
  // const persistor = persistStore(store);

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      store.replaceReducer(Reducers);
    });
  }

  return { store };
};

export const { store } = configureStore();
