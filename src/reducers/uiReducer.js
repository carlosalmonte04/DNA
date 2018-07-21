import * as T from "@dnaActions";
import { Meal } from "@dnaModels";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  gotAnalysis: false,
  pictureOnAnalyser: null,
  dashboardLoading: true,
  displayingMeal: null,
  signUpModalShowing: false,
  signUpFormCompleted: false,
  isFoodModalOpen: false,
  mealOnAnalyser: new Meal(),
  activeConceptId: ""
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.OPEN_MODAL:
      return Object.assign({}, state, { foodsModalOpen: true });

    case T.CLOSE_MODAL:
      return Object.assign({}, state, { foodsModalOpen: false });

    case T.SET_LOADING:
      return Object.assign({}, state, { isLoading: action.payload });

    case T.SET_PICTURE_ON_ANALYSER:
      const { picturePath } = action.payload;
      return Object.assign({}, state, { pictureOnAnalyser: picturePath });

    case T.CHANGE_DISPLAYING_MEAL:
      return Object.assign({}, state, { displayingMeal: action.payload });

    case T.TOGGLE_DASHBOARD_LOADING:
      return Object.assign({}, state, { dashboardLoading: action.payload });

    case T.TOGGLE_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        signUpModalShowing: !state.signUpModalShowing
      });

    case T.TOGGLE_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: action.payload });

    case T.TOGGLE_SIGN_UP_FORM_COMPLETED:
      return Object.assign({}, state, { signUpFormCompleted: action.payload });

    case T.TOGGLE_WELCOME_MESSAGE:
      return Object.assign({}, state, { welcomeMessage: action.payload });

    case T.TOGGLE_ADD_FOOD_MODAL:
      return Object.assign({}, state, {
        isFoodModalOpen: !state.isFoodModalOpen
      });

    case T.SET_STATUS_BAR_HEIGHT:
      const {
        payload: { statusBarHeight }
      } = action;

      return {
        ...state,
        statusBarHeight
      };

    case T.SET_ACTIVE_CONCEPT_ID:
      const {
        payload: { activeConceptId }
      } = action;

      return {
        ...state,
        activeConceptId
      };

    case T.SET_ANALYSER_PROCESS_TRACKER:
      const {
        payload: { processState }
      } = action;

      return {
        ...state,
        processState
      };

    default:
      return state;
  }
};
