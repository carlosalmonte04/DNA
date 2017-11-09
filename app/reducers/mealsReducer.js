import Meal from '../models/meal'
import Food from '../models/food'

const initialState = { 
	all: [],
	mealOnAnalyser: new Meal(), // =-> placeholder for Meal()
  macros : {
    calorie: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
  },
  micros : {},
}

function mealsReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_MEAL":
    	const meal = new Meal(action.payload)
      return Object.assign({}, state, {mealOnAnalyser: meal})

    case "ADD_OR_REMOVE_FOOD":
      if (state.mealOnAnalyser.foods.find(food => food.id === action.payload)) {
        console.log("removing")
        state.mealOnAnalyser.foods = state.mealOnAnalyser.foods.filter(food => food.id !== action.payload)
        const newMacros = state.mealOnAnalyser.macros()
        const newMicros = state.mealOnAnalyser.micros()
        return Object.assign({}, state, {macros: newMacros, micros: newMicros})
      }
      else {
        state.mealOnAnalyser.foods.push(Food.all().find(food => food.id === action.payload))
        console.log("adding")
        const newMacros = state.mealOnAnalyser.macros()
        const newMicros = state.mealOnAnalyser.micros()
    	   return Object.assign({}, state, {macros: newMacros, micros: newMicros})
      }

    case "ADD_MEAL":
      return Object.assign({}, state, {all: [...state.all, action.payload]})

    case "SET_ALL_MEALS_IN_STATE":
      return Object.assign({}, state, {all: action.payload})

    case "RESET_MEALS":
      Meal.reset()
      return Object.assign({}, state, {mealOnAnalyser: new Meal(), macros: {...initialState.macros}, all: []})

    case "UPDATE_MACROS":
        newMacros = state.mealOnAnalyser.macros()
        return Object.assign({}, state, {macros: newMacros})
        

    default:
      return state
  }

}

export default mealsReducer
