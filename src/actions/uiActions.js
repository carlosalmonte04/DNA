import * as T from "./types";
import { analyse } from "./mealsActions";

export const changeDisplayingMeal = meal => {
  return {
    type: T.CHANGE_DISPLAYING_MEAL,
    payload: meal
  };
};

export const navigateToDashboard = () => {
  return {
    type: T.NAVIGATE_TO_DASHBOARD
  };
};

export const setPictureOnAnalyser = picturePath => {
  return {
    type: T.SET_PICTURE_ON_ANALYSER,
    payload: { picturePath }
  };
};

export const setStatusBarHeight = statusBarHeight => ({
  type: T.SET_STATUS_BAR_HEIGHT,
  payload: { statusBarHeight }
});

export const setLoading = bool => {
  return {
    type: T.SET_LOADING,
    payload: bool
  };
};

export const toggleAddFoodModal = () => {
  return {
    type: T.TOGGLE_ADD_FOOD_MODAL
  };
};

export const toggleDashboardLoading = bool => {
  return {
    type: T.TOGGLE_DASHBOARD_LOADING,
    payload: bool
  };
};

export function openFoodsModal() {
  return {
    type: T.OPEN_MODAL
  };
}
export function closeFoodsModal() {
  return {
    type: T.CLOSE_MODAL
  };
}

export const toggleLoggedIn = bool => {
  return {
    type: T.TOGGLE_LOGGED_IN,
    payload: bool
  };
};

export const toggleSignUpFormCompleted = bool => {
  return {
    type: T.TOGGLE_SIGN_UP_FORM_COMPLETED,
    payload: bool
  };
};

export const toggleSignUpModal = () => {
  return {
    type: T.TOGGLE_SIGN_UP_MODAL
  };
};

export const setActiveConceptId = conceptId => {
  return {
    type: T.SET_ACTIVE_CONCEPT_ID,
    payload: { conceptId }
  };
};

export const setAnalyserProcessTracker = processState => ({
  type: T.SET_ANALYSER_PROCESS_TRACKER,
  payload: { processState }
});
