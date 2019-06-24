import { NavigationActions } from 'react-navigation';

import { homeTabNames } from 'config';

import Types from './types';

export const popAuthNav = () => ({
  type: Types.AUTH_POP,
});

export const setParamsCustomKey = ({ params, key }) => ({
  type: 'Navigation/SET_PARAMS',
  params,
  key,
});

export const customNavAction = (screen, params = {}) => ({
  type: 'Navigation/NAVIGATE',
  routeName: screen,
  params,
});

export const customNavResetToHomeNavFromAuth = () => dispatch => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'HomeNavigator' })],
  });

  dispatch(resetAction);
};

export const customNavResetOnChatTap = currentRouteName => {
  console.log(`Current Route Name in CustomNavActions:`, currentRouteName);

  return dispatch => {
    if (!homeTabNames[currentRouteName]) {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'HomeNavigatorMessages' }),
          NavigationActions.navigate({ routeName: 'KickwheelChat' }),
        ],
      });

      return dispatch(resetAction);
    }

    if (currentRouteName !== 'Messages') {
      dispatch(customNavAction('Messages'));
    }

    return dispatch(customNavAction('KickwheelChat'));
  };
};

export const customNavResetToRoute = routeName => {
  return dispatch => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });

    dispatch(resetAction);
  };
};

// // V2
// let _navigator;

// const setTopLevelNavigator = (navigatorRef) => {
//   _navigator = navigatorRef;
// }

// export const customNavAction = (routeName, params) => {
//   _navigator.dispatch(
//     NavigationActions.navigate({
//       routeName,
//       params,
//     })
//   );
// }
