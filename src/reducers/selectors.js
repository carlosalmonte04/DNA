import { createSelector } from "reselect";
import { defaultRefs } from "@dnaConfig";

const { nullfunc, emptyArr } = defaultRefs;

const ConceptsDataSel = ({
  meals: {
    mealOnAnalyser: { conceptsData }
  }
}) => conceptsData;

const optionsDataSel = ({
  meals: {
    mealOnAnalyser: { optionsData }
  }
}) => optionsData;

const concepIdSelector = (state, { conceptId }) => conceptId;

export const conceptSel = createSelector(
  ConceptsDataSel,
  concepIdSelector,
  (conceptsData, conceptId) => conceptsData[conceptId]
);

const conceptOptionsSel = createSelector(
  conceptSel,
  nullfunc,
  concept => concept.options
);

export const conceptOptionsDataSel = createSelector(
  [conceptSel, conceptOptionsSel, optionsDataSel],
  (concept, options, optionsData) =>
    options && options.map(optionId => optionsData[optionId])
);

export const conceptNameSel = createSelector(
  [conceptSel],
  concept => concept && concept.name
);

export const conceptSelectedOptionSel = createSelector(
  conceptSel,
  optionsDataSel,
  (concept, optionsData) => {
    console.log(`Concept con`, concept, "options data", optionsData);
    optionsData[concept.selectedOptionId];
  }
);

export const selectedOptionNameSel = createSelector(
  [conceptSelectedOptionSel],
  selectedOption => {
    console.log(`selectedOption`, selectedOption);
    return "";
  }
);

export const conceptAnalysisSel = createSelector(
  [conceptSelectedOptionSel],
  ({ analysis }) => analysis
);

export const conceptMicrosSel = createSelector(
  [conceptAnalysisSel],
  analysis => {
    console.log(`What is this`, analysis);
    if (analysis && analysis.micros) {
      // return Object.values(analysis.micros);
    }

    return emptyArr;
  }
);
