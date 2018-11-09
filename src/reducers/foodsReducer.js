import Food from "../models/food";
import * as T from "@dnaActions";

const initialState = {
  stageOne: [],
  stageTwo: [],
  stageThree: [],
  // toBeLogged: [],
  // macrosToBeLogged: {
  //   calorieTotal      : 0,
  //   proteinTotal      : 0,
  //   fatTotal          : 0,
  //   carbohydrateTotal : 0,
  // }
};

export const foodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IN_STAGE_ONE":
      return Object.assign({}, state, { stageOne: action.payload });

    case "SET_IN_STAGE_TWO":
      let foodInState = Food.find(action.payload.food.id);
      foodInState.options = action.payload.usdaOptions.list.item;
      return Object.assign({}, state, {
        stageTwo: [...state.stageOne, foodInState],
      });

    case "SET_IN_STAGE_THREE":
      return Object.assign({}, state, { stageThree: action.payload });

    case "CHANGE_PORTION_SIZE":
      foodInState = Food.find(action.payload.food.id);
      foodInState.portionSize = parseInt(action.payload.portionSize);
      return Object.assign({}, state);
    case "RESET_FOODS":
      Food.reset();
      return Object.assign({}, state, { ...initialState });

    case "CHANGE_SELECTED_OPTION":
      foodInState = Food.find(action.payload.food.id);
      foodInState.changeSelOption(action.payload.selectedOptionId);
      return Object.assign({}, state);

    case "CHANGE_OPTIONS":
      foodInState = Food.find(action.payload.food.id);
      foodInState.options = action.payload.newOptions;
      console.log(
        "Changin options for",
        foodInState,
        "TOOO",
        foodInState.options,
      );
      return Object.assign({}, state);

    case T.RESET_KEEP_LOGGED_IN: {
      return initialState;
    }

    default:
      return state;
  }
};
