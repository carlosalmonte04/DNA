import { NavigationActions } from "react-navigation";
import * as T from "../actions/types";
import { AppNavigator } from "@dnaNavigation";
import { createNavigationReducer } from "react-navigation-redux-helpers";

// const initialState = AppNavigator.router.getStateForAction(
//   NavigationActions.init()
// );

// const unconnectedNavReducer = (state = initialState, action) => {
//   // console.log(`NAV STATE`, state);
//   if (action.type.startsWith("Navigation/")) {
//     const { routeName } = action;
//     // Keyboard.dismiss();
//     const lastRoute = state.routes[state.routes.length - 1];
//     if (routeName === lastRoute.routeName) {
//       return state;
//     }
//   }
//   const nextState = AppNavigator.router.getStateForAction(action, state);

//   return nextState || state;
// };

export const navReducer = createNavigationReducer(AppNavigator);

