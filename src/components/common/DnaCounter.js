import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { DnaTouchable, DnaPText } from './';
import { Icons, Colors } from '@dnaAssets';
import { defaultRefs } from 'config/env';

const localStyles = StyleSheet.create({
  container: {
    width: 90,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
  },
  btn: {
    width: '70%',
    height: '70%',
    alignSelf: 'center',
  },
});

class DnaCounter extends PureComponent {
  render() {
    const { count, onIncreasePress, onDecreasePress } = this.props;

    return (
      <View style={localStyles.container}>
        <DnaTouchable
          style={localStyles.btnContainer}
          onPress={onDecreasePress}
        >
          <Image
            source={Icons.whiteMinus}
            resizeMode="contain"
            style={localStyles.btn}
          />
        </DnaTouchable>
        <DnaPText text={count || 0} fontSize={16} color={Colors.black} />
        <DnaTouchable
          style={localStyles.btnContainer}
          onPress={onIncreasePress}
        >
          <Image
            source={Icons.whitePlus}
            resizeMode="contain"
            style={localStyles.btn}
          />
        </DnaTouchable>
      </View>
    );
  }
}

DnaCounter.propTypes = {
  count: PropTypes.number,
  onIncreasePress: PropTypes.func,
  onDecreasePress: PropTypes.func,
};

DnaCounter.defaultProps = {
  count: 0,
  onIncreasePress: defaultRefs.nullFunc,
  onDecreasePress: defaultRefs.nullFunc,
};

export { DnaCounter };
