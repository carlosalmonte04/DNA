import React from "react";
import { Button } from "native-base";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BoxShadow } from "react-native-shadow";
import { customNavAction, setConceptPortionSize } from "@dnaActions";
import { Colors, IOSX, WIDTH } from "@dnaAssets";
import { DnaHText, DnaPText, DnaTouchable, DnaCounter } from "@dnaCommon";
import {
  conceptSel,
  conceptOptionsDataSel,
  selectedOptionNameSel,
} from "@dnaReducers";

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 8,
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subContainer: {
    backgroundColor: Colors.white,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    alignSelf: "flex-start",
  },
});

const shadowOptions = {
  width: WIDTH * 0.95,
  height: 102,
  color: Colors.black,
  border: 10,
  radius: 10,
  opacity: 0.02,
  x: -2,
  y: -1,
  style: localStyles.container,
};

class UnconnectedConceptListItem extends React.Component {
  state = {};
  shouldComponentUpdate(nextProps) {
    const { name, probability, portionSize } = this.props;
    const {
      name: nextName,
      probability: nextProbability,
      portionSize: nextPortionSize,
    } = nextProps;
    if (name !== nextName) {
      return true;
    }

    if (probability !== nextProbability) {
      return true;
    }

    if (portionSize !== nextPortionSize) {
      return true;
    }

    return false;
  }

  onContainerPress = () => {
    this.props.customNavAction("ConceptScreen", {
      conceptId: this.props.conceptId,
    });
  };

  onPortionSizeIncrease = () => {
    const { setConceptPortionSize, portionSize, conceptId } = this.props;
    if (!portionSize) {
      setConceptPortionSize({ conceptId, portionSize: 1 });
    } else {
      setConceptPortionSize({
        conceptId,
        portionSize: portionSize + 1,
      });
    }
  };

  onPortionSizeDecrease = () => {
    const { setConceptPortionSize, portionSize, conceptId } = this.props;
    if (portionSize) {
      setConceptPortionSize({
        conceptId,
        portionSize: portionSize - 1,
      });
    }
  };

  render() {
    const { concept, selectedOptionName } = this.props;
    const { name, probability, portionSize } = concept || {};

    console.log(`Concept in component`, portionSize);
    const fomattedProbability = `${parseInt(probability * 100, 0)}%`;

    return (
      <BoxShadow setting={shadowOptions}>
        <DnaTouchable
          style={localStyles.subContainer}
          onPress={this.onContainerPress}
        >
          <View>
            <DnaHText text={name} fontSize={30} style={localStyles.name} />
            <DnaPText
              text={selectedOptionName && selectedOptionName.slice(0, 30)}
              fontSize={12}
            />
          </View>

          <DnaPText text={fomattedProbability} />
          <DnaCounter
            count={portionSize}
            onIncreasePress={this.onPortionSizeIncrease}
            onDecreasePress={this.onPortionSizeDecrease}
          />
        </DnaTouchable>
      </BoxShadow>
    );
  }
}

const createConceptSel = () => conceptSel;
const createSelectedOptionNameSel = () => selectedOptionNameSel;

const mapStateToProps = (state, ownProps) => {
  const conceptSel = createConceptSel();
  const selectedOptionNameSel = createSelectedOptionNameSel();
  const concept = conceptSel(state, ownProps);
  return {
    concept,
    conceptOptions: conceptOptionsDataSel(state, ownProps),
    selectedOptionName: selectedOptionNameSel(state, ownProps),
    portionSize: concept && concept.portionSize,
  };
};

export const ConceptListItem = connect(mapStateToProps, {
  customNavAction,
  setConceptPortionSize,
})(UnconnectedConceptListItem);

UnconnectedConceptListItem.propTypes = {
  conceptId: PropTypes.string,
};

UnconnectedConceptListItem.defaultProps = {
  conceptId: "",
};
