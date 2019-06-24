import AsyncStorage from '@react-native-community/async-storage';
import { persistCombineReducers } from 'redux-persist';

import { DEV, devFlags, defaultRefs } from 'config/config';
import foods from 'redux/foods/reducer';
import meals from 'redux/meals/reducer';
import ui from 'redux/ui/reducer';
import user from 'redux/user/reducer';
import { getNavigationReducer } from 'redux/navigation/reducer';
import { RootNavigator } from 'navigation/RootNavigator';

const { keepMealOnView } = devFlags;

const mealDependentReducers = ['ui', 'foods', 'meals'];

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav'].concat(
    DEV && keepMealOnView ? defaultRefs.emptyArr : mealDependentReducers,
  ),
  debounce: 50,
};

export const reducers = {
  foods,
  meals,
  navigation: getNavigationReducer(RootNavigator),
  ui,
  user,
};

export default persistCombineReducers(config, reducers);
