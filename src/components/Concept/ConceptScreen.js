import React from "react";
import { connect } from "react-redux";
import {
  conceptNameSel,
  selectedOptionNameSel,
  conceptAnalysisSel,
  conceptMicrosSel
} from "@dnaReducers";
import {
  FullScreenContainer,
  DnaHText,
  DnaPText,
  DnaTouchable
} from "@dnaCommon";
import Picker from "react-native-picker";

pickerData = [
  {
    a: [1, 2, 3, 4]
  },
  {
    b: [5, 6, 7, 8]
  }
];
selectedValue = ["a", 2];

class UnconnectedConceptScreen extends React.PureComponent {
  showPicker = () => {
    Picker.init({
      pickerData,
      selectedValue: ["a", 1],
      onPickerConfirm: data => {
        console.log(data);
      },
      onPickerCancel: data => {
        console.log(data);
      },
      onPickerSelect: data => {
        console.log(data);
      }
    });
    Picker.show();
  };

  render() {
    const { conceptName, selectedOptionName, micros } = this.props;

    console.log(`micros`, micros);
    return (
      <FullScreenContainer>
        <DnaHText text={conceptName} fontSize={32} fontWeight={"400"} />
        <DnaPText text={`Which kind of ${conceptName}?`} />
        <DnaTouchable isDebounce onPress={this.showPicker}>
          <DnaPText text={`${selectedOptionName}`} />
        </DnaTouchable>
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = (
  state,
  {
    navigation: {
      state: {
        params: { conceptId }
      }
    }
  }
) => ({
  conceptName: conceptNameSel(state, { conceptId }),
  selectedOptionName: selectedOptionNameSel(state, { conceptId }),
  analysis: conceptAnalysisSel(state, { conceptId }),
  micros: conceptMicrosSel(state, { conceptId })
});

export const ConceptScreen = connect(mapStateToProps)(UnconnectedConceptScreen);
