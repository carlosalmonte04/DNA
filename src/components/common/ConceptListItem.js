import React from "react";
import { Button } from "native-base";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { customNavAction } from "@dnaActions";
import { Colors } from "@dnaAssets";
import { DnaHText, DnaPText, DnaTouchable } from "@dnaCommon";
import {
  conceptSel,
  conceptOptionsDataSel,
  selectedOptionNameSel
} from "@dnaReducers";

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  subContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 32,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "space-between"
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: -1,
      height: 1
    }
  },
  concept: {
    margin: 10,
    padding: 16
  },
  shadow: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: -1,
      height: 1
    }
  }
});

class UnconnectedConceptListItem extends React.PureComponent {
  onContainerPress = () => {
    this.props.customNavAction("ConceptScreen", {
      conceptId: this.props.conceptId
    });
  };
  render() {
    const { concept, conceptOptions } = this.props;
    console.log(`concept`, concept);
    const { name, probability } = concept;

    const fomattedProbability = `${parseInt(probability * 100, 0)}%`;

    return (
      <DnaTouchable
        style={localStyles.container}
        onPress={this.onContainerPress}
      >
        <View style={localStyles.subContainer}>
          <DnaHText text={name} fontSize={32} />
          <DnaPText text={fomattedProbability} />
        </View>
        <DnaPText text={fomattedProbability} />
      </DnaTouchable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  concept: conceptSel(state, ownProps),
  conceptOptions: conceptOptionsDataSel(state, ownProps),
  selectedOptionName: selectedOptionNameSel(state, ownProps)
});

export const ConceptListItem = connect(mapStateToProps, { customNavAction })(
  UnconnectedConceptListItem
);

UnconnectedConceptListItem.propTypes = {
  conceptId: PropTypes.string
};

UnconnectedConceptListItem.defaultProps = {
  conceptId: ""
};
