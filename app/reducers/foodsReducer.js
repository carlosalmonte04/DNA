import Food from '../models/user'

const initialState = { 
  stageOne: [],
  stageTwo: [],
	stageThree: [],
  toBeLogged: [],
  macrosToBeLogged: {
    calorieTotal      : 0,
    proteinTotal      : 0,
    fatTotal          : 0,
    carbohydrateTotal : 0,
  }
}

function foodsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_IN_STAGE_ONE":
      return Object.assign({}, state, {stageOne: action.payload})

    case "SET_IN_STAGE_TWO":
      let foodInState = state.stageOne.find(food => food.id === action.payload.food.id)
      foodInState.options = action.payload.usdaOptions.list.item
      return Object.assign({}, state, {stageTwo: [...state.stageOne, foodInState]})

    case "SET_IN_STAGE_THREE":
      return Object.assign({}, state, {stageThree: action.payload})

    case "CHANGE_PORTION_SIZE":
      foodInState = state.stageThree.find(food => food.id === action.payload.food.id)
      foodInState.portionSize = parseInt(action.payload.portionSize)
      return Object.assign({}, state)
    case "RESET_FOODS":
      Food.reset()
      return Object.assign({}, state, {...initialState})

    default:
      return state
  }

}

export default foodsReducer
