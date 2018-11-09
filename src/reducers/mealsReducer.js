import { Meal, Food } from "@dnaModels";
import { defaultRefs } from "@dnaConfig";
import * as T from "@dnaActions";

const { emptyArr } = defaultRefs;

const initialState = {
  all: emptyArr,
  mealOnAnalyser: new Meal(Meal.DEFAULT_MEAL_ATTRIBUTES), // =-> placeholder for Meal()}
  userMeals: emptyArr,
  macros: {
    calorie: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0
  },
  micros: {},
  activeMealId: "",
  userMealsIds: emptyArr,
  userMealsData: {}
};

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.SET_MEAL_ON_ANALYSER:
      const { meal } = action.payload;
      return Object.assign({}, state, { mealOnAnalyser: meal });

    case T.ADD_OR_REMOVE_FOOD:
      const { mealOnAnalyser } = state;
      const { foodId } = action.payload;

      if (mealOnAnalyser[foodId]) {
        mealOnAnalyser.removeFood(foodId);
      } else {
        mealOnAnalyser.addFood(foodId);
      }

      if (state.mealOnAnalyser.foods.find(food => food.id === action.payload)) {
        console.log("removing");
        state.mealOnAnalyser.foods = state.mealOnAnalyser.foods.filter(
          food => food.id !== action.payload
        );
        const newMacros = state.mealOnAnalyser.macros();
        const newMicros = state.mealOnAnalyser.micros();
        return Object.assign({}, state, {
          macros: newMacros,
          micros: newMicros
        });
      } else {
        state.mealOnAnalyser.foods.push(
          Food.all().find(food => food.id === action.payload)
        );
        console.log("adding");
        const newMacros = state.mealOnAnalyser.macros();
        const newMicros = state.mealOnAnalyser.micros();
        return Object.assign({}, state, {
          macros: newMacros,
          micros: newMicros
        });
      }

    case T.ADD_MEAL:
      console.log("BEFORE ADDED MEAL TO STATE", state);
      return Object.assign({}, state, { all: [...state.all, action.payload] });

    case T.SET_ALL_MEALS_IN_STATE:
      const { userMealsIds, userMealsData } = action.payload;
      return {
        ...state,
        userMealsIds,
        userMealsData
      };

    case T.RESET_MEALS:
      Meal.reset();
      return Object.assign({}, state, {
        mealOnAnalyser: new Meal(),
        macros: { ...initialState.macros },
        all: emptyArr
      });

    case T.SET_CONCEPT_PORTION_SIZE: {
      const { conceptId, portionSize } = action.payload;
      const mealConceptsData = state.mealOnAnalyser.conceptsData;
      return {
        ...state,
        mealOnAnalyser: {
          ...state.mealOnAnalyser,
          conceptsData: {
            ...mealConceptsData,
            [conceptId]: {
              ...mealConceptsData[conceptId],
              portionSize
            }
          }
        }
      };
    }
    case T.UPDATE_MACROS:
      newMacros = state.mealOnAnalyser.macros();
      return Object.assign({}, state, { macros: newMacros });

    case T.SET_ACTIVE_MEAL_ID:
      const { mealId } = action.payload;
      return Object.assign({}, state, { activeMealId: mealId });

    case T.RESET_KEEP_LOGGED_IN: {
      return initialState;
    }

    default:
      return state;
  }
};
