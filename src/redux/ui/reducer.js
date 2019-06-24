import { Types } from './types';
import { Meal } from 'models/meal';

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
  activeConceptId: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_MODAL:
      return Object.assign({}, state, { foodsModalOpen: true });

    case Types.CLOSE_MODAL:
      return Object.assign({}, state, { foodsModalOpen: false });

    case Types.SET_LOADING:
      return Object.assign({}, state, { isLoading: action.payload });

    case Types.SET_PICTURE_ON_ANALYSER:
      const { picturePath } = action.payload;
      return Object.assign({}, state, { pictureOnAnalyser: picturePath });

    case Types.CHANGE_DISPLAYING_MEAL:
      return Object.assign({}, state, { displayingMeal: action.payload });

    case Types.TOGGLE_DASHBOARD_LOADING:
      return Object.assign({}, state, { dashboardLoading: action.payload });

    case Types.TOGGLE_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        signUpModalShowing: !state.signUpModalShowing,
      });

    case Types.TOGGLE_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: action.payload });

    case Types.TOGGLE_SIGN_UP_FORM_COMPLETED:
      return Object.assign({}, state, { signUpFormCompleted: action.payload });

    case Types.TOGGLE_WELCOME_MESSAGE:
      return Object.assign({}, state, { welcomeMessage: action.payload });

    case Types.TOGGLE_ADD_FOOD_MODAL:
      return Object.assign({}, state, {
        isFoodModalOpen: !state.isFoodModalOpen,
      });

    case Types.SET_STATUS_BAR_HEIGHT:
      const {
        payload: { statusBarHeight },
      } = action;

      return {
        ...state,
        statusBarHeight,
      };

    case Types.SET_ACTIVE_CONCEPT_ID:
      const {
        payload: { activeConceptId },
      } = action;

      return {
        ...state,
        activeConceptId,
      };

    case Types.SET_ANALYSER_PROCESS_TRACKER:
      const {
        payload: { processState },
      } = action;

      return {
        ...state,
        processState,
      };

    case Types.RESET_KEEP_LOGGED_IN: {
      return initialState;
    }

    default:
      return state;
  }
};
