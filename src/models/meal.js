import { setUserMeals } from "@dnaActions";
import {
  createMealWithPicture,
  defaultAPIReqData,
  getAPIEndpoint,
  getAllUserMeals
} from "@dnaHelpers";

export const DEFAULT_MEAL_ATTRIBUTES = {
  _id: "",
  name: "",
  userId: "",
  pictureUrl: "",
  optionsData: {},
  concepts: [],
  conceptsData: {},
  micros: {},
  macros: {
    calorie: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0
  }
};

export const Meal = (() => {
  let allUserMeals = [];
  let dispatch;

  return class Meal {
    constructor(attributes) {
      for (const key in attributes) {
        this[key] = attributes[key];
      }
    }

    static reset() {
      allUserMeals = [];
    }

    static connectDispatch({ dispatch }) {
      if (!this.dispatch) {
        this.dispatch = dispatch;
      }
      return next => action => next(action);
    }

    static get DEFAULT_MEAL_ATTRIBUTES() {
      return {
        _id: "",
        name: "",
        userId: "",
        pictureUrl: "",
        concepts: [],
        conceptsData: {},
        optionsData: {},
        micros: {},
        macros: {
          calorie: 0,
          protein: 0,
          fat: 0,
          carbohydrate: 0
        }
      };
    }

    static get allUserMeals() {
      return allUserMeals;
    }

    static getAllUserMeals = async token => {
      /*
        make API call to return all meals
      */

      console.log(`Meals - Getting meals`, token);

      const { userMealsIds, userMealsData } = await getAllUserMeals({ token });

      userMealsIds.forEach(mealId => {
        userMealsData[mealId] = new Meal(userMealsData[mealId]);
      });
      console.log(`meals - saving meals`);
      return this.dispatch(setUserMeals({ userMealsIds, userMealsData }));
    };

    static async create({ picturePath, token }) {
      if (token) {
        try {
          const { meal: mealData, conceptsData } = await createMealWithPicture({
            picturePath,
            token
          });

          console.log(`Meal - what is mealData`, mealData, conceptsData);

          const meal = new Meal({ ...mealData, conceptsData });

          return meal;
        } catch (err) {
          console.log("*Meal concepts", err);
          return new Meal(Meal.DEFAULT_MEAL_ATTRIBUTES);
        }
      }
    }

    macros() {
      let macros = {
        calorie: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0
      };
      this.foods.forEach(food => {
        macros.calorie += food.macros.calorie.value * food.portionSize;
        macros.protein += food.macros.protein.value * food.portionSize;
        macros.fat += food.macros.fat.value * food.portionSize;
        macros.carbohydrate +=
          food.macros.carbohydrate.value * food.portionSize;
      });
      return macros;
    }

    micros() {
      let micros = {};

      this.foods.forEach(food => {
        for (let key in food.micros) {
          if (micros[key]) {
            micros[key]["value"] +=
              food.micros[key]["value"] * food.portionSize;
          } else {
            micros[key] = Object.assign({}, food.micros[key]);
          }
        }
      });
      return micros;
    }

    removeFood = foodName => {};

    addFood = async foodName => {
      const { store } = getStore();
      // this.foods.push(food);
    };

    addConcept = concept => {
      this.concepts.push(concept);
      this.conceptsObj[conceptId] = concept;
    };

    getUSDAOptions = async token => {
      const optionsRes = await fetch(
        getAPIEndpoint(`/meals/${this._id}/conceptsOptions/`),
        defaultAPIReqData({ token })
      );

      const { conceptsWithOptions, optionsData } = await optionsRes.json();

      this.concepts.forEach(conceptId => {
        const optionsForConcept = optionsData[conceptId];

        this.conceptsData[conceptId].options = conceptsWithOptions[conceptId];

        // TODO: Automatically selecting first option
        // find programatically way of auto selecting based on prev selections
        const [firstOptionId] = this.conceptsData[conceptId].options;
        console.log(`FIRST OPTION ID!!!`, firstOptionId);
        this.conceptsData[conceptId].selectedOptionId = firstOptionId;
      });

      this.optionsData = optionsData;
    };

    getAllAnalysisForSelectedOptions = async () => {
      const analysisProm = this.concepts.map(async conceptId => {
        const concept = this.conceptsData[conceptId];
        const { selectedOptionId } = concept;
        const selectedOption = this.optionsData[selectedOptionId];

        const { ndbno } = selectedOption;
        const analysisRes = await fetch(
          getAPIEndpoint(
            `/meals/${this._id}/concepts/${conceptId}/options/${ndbno}/analysis`
          )
        );
        const { analysis } = await analysisRes.json();

        this.optionsData[selectedOptionId].analysis = analysis;

        return true;
      });
      await Promise.all(analysisProm);
      return true;
    };

    save() {
      /*
      save on user db and async storage
    */
    }

    delete() {
      /*
      permanently delete from db and async storage
    */
    }

    edit(newMealInfo) {
      /*
      make PUT call to edit the info
    */
    }
  };
})();
