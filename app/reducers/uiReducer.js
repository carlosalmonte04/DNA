const initialState = { 
  isLoggedIn: false,
  isLoading: true,
  gotAnalysis: false,
  pictureOnAnalyser: null,
  dashboardLoading: true,
  displayingMeal: null,
  signUpModalShowing: false,
  signUpFormCompleted: false,
  isFoodModalOpen: false
}

function foodsReducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return Object.assign({}, state, {foodsModalOpen: true})

    case "CLOSE_MODAL":
      return Object.assign({}, state, {foodsModalOpen: false})

    case "SET_LOADING":
      return Object.assign({}, state, {isLoading: action.payload})

    case "CHANGE_PICTURE_ON_ANALYSER":
      return Object.assign({}, state, {pictureOnAnalyser: action.payload})

    case "CHANGE_DISPLAYING_MEAL":
      return Object.assign({}, state, {displayingMeal: action.payload})

    case "TOGGLE_DASHBOARD_LOADING":
      return Object.assign({}, state, {dashboardLoading: action.payload})

    case "TOGGLE_SIGN_UP_MODAL":
      return Object.assign({}, state, {signUpModalShowing: !state.signUpModalShowing})

    case "TOGGLE_LOGGED_IN":
      return Object.assign({}, state, {isLoggedIn: action.payload})

    case "TOGGLE_SIGN_UP_FORM_COMPLETED":
      return Object.assign({}, state, {signUpFormCompleted: action.payload})

    case "TOGGLE_WELCOME_MESSAGE":
      return Object.assign({}, state, {welcomeMessage: action.payload})
      break

    case "TOGGLE_ADD_FOOD_MODAL":
      return Object.assign({}, state, {isFoodModalOpen: !state.isFoodModalOpen})
      break

    default:
      return state
  }

}

export default foodsReducer
