import { createSelector } from "reselect";
import { defaultRefs } from "@dnaConfig";

const { nullfunc, emptyArr } = defaultRefs;

const ConceptsDataSel = ({
  meals: {
    mealOnAnalyser: { conceptsData },
  },
}) => conceptsData;

const optionsDataSel = ({
  meals: {
    mealOnAnalyser: { optionsData },
  },
}) => optionsData;

const concepIdSelector = (state, { conceptId }) => conceptId;

export const conceptSel = createSelector(
  ConceptsDataSel,
  concepIdSelector,
  (conceptsData, conceptId) => conceptsData && conceptsData[conceptId] || {},
);

const conceptOptionsSel = createSelector(conceptSel, nullfunc, concept => {
  return concept && concept.options;
});

export const conceptOptionsDataSel = createSelector(
  [conceptSel, conceptOptionsSel, optionsDataSel],
  (concept, options, optionsData) =>
    options && options.map(optionId => optionsData[optionId]),
);

export const conceptNameSel = createSelector(
  [conceptSel],
  concept => concept && concept.name,
);

export const conceptSelectedOptionSel = createSelector(
  conceptSel,
  optionsDataSel,
  (concept, optionsData) => {
    if (concept) {
      return optionsData && optionsData[concept.selectedOptionId] || {};
    } else {
      return {};
    }
  },
);

export const selectedOptionNameSel = createSelector(
  conceptSelectedOptionSel,
  ({ name }) => name,
);

export const conceptAnalysisSel = createSelector(
  [conceptSelectedOptionSel],
  ({ analysis }) => analysis,
);

export const conceptMicrosSel = createSelector(
  [conceptAnalysisSel],
  analysis => {
    console.log(`What is this`, analysis);
    if (analysis && analysis.micros) {
      // return Object.values(analysis.micros);
    }

    return emptyArr;
  },
);

const getUserMealsIdsFromState = ({ meals: { userMealsIds, userMealsData } }) =>
  userMealsIds.map(mealId => userMealsData[mealId]);

export const userMealsSel = createSelector(
  [getUserMealsIdsFromState],
  userMeals => userMeals,
);
