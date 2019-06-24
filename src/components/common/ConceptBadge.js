import React from 'react';
import { Button } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customNavAction } from '@dnaActions';
import { Colors } from '@dnaAssets';
import { defaultRefs } from 'config/env';
import { DnaHText, DnaPText, DnaTouchable } from '@dnaCommon';
import {
  conceptSel,
  conceptOptionsDataSel,
  selectedOptionNameSel,
} from '@dnaReducers';

const localStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 40,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  text: { bottom: 2 },
});

class UnconnectedConceptBadge extends React.PureComponent {
  state = {
    height: 0,
    width: 0,
  };

  onContainerPress = () => {
    this.props.customNavAction('ConceptScreen', {
      conceptId: this.props.conceptId,
    });
  };

  onLayout = ({
    nativeEvent: {
      layout: { height, width },
    },
  }) => {
    if (this.state.layedOut) {
      return null;
    }

    this.setState({
      height: height, // 8 is paddingVertical * 2
      width: width, // 16 is paddingHorizontal * 2
      layedOut: true,
    });
    return;
  };
  render() {
    const { concept } = this.props;
    const { name } = concept;
    return (
      <DnaTouchable
        style={localStyles.container}
        onPress={this.onContainerPress}
      >
        <DnaPText
          bold
          text={name}
          color={Colors.black}
          size={4}
          style={localStyles.text}
        />
      </DnaTouchable>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  concept: conceptSel(state, ownProps) || defaultRefs.emptyObj,
});

export const ConceptBadge = connect(
  mapStateToProps,
  { customNavAction },
)(UnconnectedConceptBadge);

UnconnectedConceptBadge.propTypes = {
  conceptId: PropTypes.string,
};

UnconnectedConceptBadge.defaultProps = {
  conceptId: '',
};
