import Food from 'models/food';
import Types from './types';

const initialState = {
  stageOne: [],
  stageTwo: [],
  stageThree: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_IN_STAGE_ONE:
      return Object.assign({}, state, { stageOne: action.payload });

    case Types.SET_IN_STAGE_TWO:
      let foodInState = Food.find(action.payload.food.id);
      foodInState.options = action.payload.usdaOptions.list.item;
      return Object.assign({}, state, {
        stageTwo: [...state.stageOne, foodInState],
      });

    case Types.SET_IN_STAGE_THREE:
      return Object.assign({}, state, { stageThree: action.payload });

    case Types.CHANGE_PORTION_SIZE:
      foodInState = Food.find(action.payload.food.id);
      foodInState.portionSize = parseInt(action.payload.portionSize, 0);
      return Object.assign({}, state);
    case Types.RESET_FOODS:
      Food.reset();
      return Object.assign({}, state, { ...initialState });

    case Types.CHANGE_SELECTED_OPTION:
      foodInState = Food.find(action.payload.food.id);
      foodInState.changeSelOption(action.payload.selectedOptionId);
      return Object.assign({}, state);

    case Types.CHANGE_OPTIONS:
      foodInState = Food.find(action.payload.food.id);
      foodInState.options = action.payload.newOptions;
      return Object.assign({}, state);

    default:
      return state;
  }
};
