import { updateMacrosInMeal } from './foodsActions';
import RNFetchBlob from 'react-native-fetch-blob';
import { newMeal } from './mealsActions';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'config/env';
import { USDA_KEY } from 'config/env';
import setLoading from './uiActions';
import { Food } from '@dnaModels';

export const changeOptions = (food, newOptions) => {
  return {
    type: 'CHANGE_OPTIONS',
    payload: { food, newOptions },
  };
};

export const changeOption = (food, selectedOptionId) => {
  return {
    type: 'CHANGE_SELECTED_OPTION',
    payload: { food, selectedOptionId },
  };
};

export const resetFoods = () => {
  return {
    type: 'RESET_FOODS',
  };
};

export const setAnalysis = foods => {
  return {
    type: 'SET_IN_STAGE_THREE',
    payload: foods,
  };
};

export const toBeLoggedAdd = food => {
  return {
    type: 'ADD_TO_TO_BE_LOGGED',
    payload: food,
  };
};

export const toBeLoggedRemove = foodId => {
  return {
    type: 'REMOVE_FROM_TO_BE_LOGGED',
    payload: foodId,
  };
};

export const changePortionSize = (food, portionSize) => {
  return dispatch => {
    dispatch(makeTheChange(food, portionSize));
    dispatch(updateMacrosInMeal());
  };
};
