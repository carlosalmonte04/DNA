import { NavigationActions } from 'react-navigation';
import * as T from '../actions/types';
import { RootNavigator } from 'navigation/RootNavigator';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

export const navReducer = createNavigationReducer(AppNavigator);
