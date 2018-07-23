import * as T from "./types";
import {
  toggleDashboardLoading,
  setLoading,
  setPictureOnAnalyser,
  setAnalyserProcessTracker
} from "./uiActions";
import { AsyncStorage } from "react-native";
import { ENV } from "@dnaConfig";
import { Meal, Food } from "@dnaModels";
import { getAPIEndpoint, getUSDAApiUrl, uploadMedia } from "@dnaHelpers";
import { getStore } from "@dnaStore";

const { USDA_KEY, API_URL } = ENV;

export const ANALYSER_STATES = {
  MEAL_WITH_CONCEPTS: "meal_with_concepts",
  CONCEPTS_WITH_OPTIONS: "concepts_with_options",
  OPTIONS_WITH_ANALYSIS: "options_with_analysis"
};

export const addFood = (food, foodInfo) => {
  return {
    type: T.ADD_FOOD_TO_MEAL,
    payload: { food, foodInfo }
  };
};

export const addMeal = meal => {
  return {
    type: T.ADD_MEAL,
    payload: meal
  };
};

export const addOrRemoveFood = foodId => {
  return {
    type: T.ADD_OR_REMOVE_FOOD,
    payload: { foodId }
  };
};

export const setMealOnAnalyser = meal => {
  return {
    type: T.SET_MEAL_ON_ANALYSER,
    payload: { meal }
  };
};

export const removeFood = food => {
  return {
    type: T.REMOVE_FOOD_FROM_MEAL,
    payload: food
  };
};

export const resetMeals = () => {
  return {
    type: T.RESET_MEALS
  };
};

export const setUserMeals = ({ userMealsIds, userMealsData }) => {
  return {
    type: T.SET_ALL_MEALS_IN_STATE,
    payload: { userMealsIds, userMealsData }
  };
};

export const updateMacrosInMeal = () => {
  return {
    type: T.UPDATE_MACROS
  };
};

export const setInStageThree = foods => {
  return {
    type: T.SET_IN_STAGE_THREE,
    payload: foods
  };
};
export const setActiveMealId = mealId => {
  return {
    type: T.SET_ACTIVE_MEAL_ID,
    payload: { mealId }
  };
};

export const startAnalyser = picturePath => {
  const {
    store: { getState }
  } = getStore();
  const {
    user: { token }
  } = getState();
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(setPictureOnAnalyser(picturePath));
    dispatch(analysePictureWithToken(picturePath, token));
  };
};

export const fetchAllMeals = () => {
  return async dispatch => {
    const apiUrl = `${API_URL}/meals/`;
    const token = await AsyncStorage.getItem("token");
    const requestData = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token
      }
    };
    return fetch(apiUrl, requestData)
      .then(res => res.json())
      .catch(error => console.log("error while getting all users meals", error))
      .then(allMealsResponse => {
        console.log("ALL MEALS RESPONSE", allMealsResponse);
        const mealsCollection = allMealsResponse.map(meal => new Meal(meal));
        dispatch(setUserMeals({ meals: mealsCollection }));
        dispatch(toggleDashboardLoading(false));
        return mealsCollection;
      });
  };
};

// export const createMeal = async (picturePath, token) => {
//   if (token) {
//     try {
//       const mealConceptsRes = await createMealWithPicture({
//         picturePath,
//         token
//       });

//       const { concepts, meal: mealInfo } = await mealConceptsRes.json();

//       return { concepts, mealInfo }; // { concepts, meal }
//     } catch (err) {
//       console.log("*Meal concepts", err);
//       return false;
//     }
//   }
// };

export const getUSDAOptionsWithFoodName = async foodName => {
  const url = getUSDAApiUrl({ endpoint: "search", foodName });

  if (!!foodName) {
    try {
      const foodOptionsRes = await fetch(url);
      const foodOptions = await foodOptionsRes.json();

      return foodOptions.list.item;
    } catch (err) {
      console.log("**Meal - getting options for food/concept", foodName);
    }
  }
};

export const getUSDAAnalysisWithNdbno = async usdaNdbno => {
  const url = getUSDAApiUrl({ endpoint: "report", usdaNdbno });

  if (!!usdaNdbno) {
    try {
      const reportRes = await fetch(url);
      const report = await reportRes.json();

      const analysis = report.foods[0].food;
      return analysis;
    } catch (err) {
      console.log("**Meal - getting report for food", food);
    }
  }
};

export function analysePictureWithToken(picturePath, token) {
  Food.reset();

  const {
    MEAL_WITH_CONCEPTS,
    CONCEPTS_WITH_OPTIONS,
    OPTIONS_WITH_ANALYSIS
  } = ANALYSER_STATES;

  return async dispatch => {
    try {
      //-----------------
      //  1. Meal.create creates a meal with concepts
      //-----------------
      const meal = await Meal.create({
        picturePath,
        token
      });
      console.log("***Meal - created", meal);
      dispatch(setMealOnAnalyser(meal));
      dispatch(setAnalyserProcessTracker(MEAL_WITH_CONCEPTS));
      dispatch(setLoading(false));

      //-----------------
      //  2. For each concept, get USDA options
      //-----------------
      await meal.getUSDAOptions(token);
      console.log("***Meal - with options");
      dispatch(setAnalyserProcessTracker(CONCEPTS_WITH_OPTIONS));

      //-----------------
      //  3. Get analysis of first food
      //-----------------
      await meal.getAllAnalysisForSelectedOptions();
      console.log("***Meal - with analysis");
      dispatch(setAnalyserProcessTracker(OPTIONS_WITH_ANALYSIS));
    } catch (err) {
      console.log("**Meal - analyse", err);
    }

    // if (Food.all().length === foodsInPicture.length) {
    //   console.log("*Meal  - success. all foods in meal:", Food.all(), "meal: ", );
    // dispatch(setInStageThree(Food.all()));
    // dispatch(setLoading(false));
    // }
  };
}
