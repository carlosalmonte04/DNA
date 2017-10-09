import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions} from 'react-native';
import { Icon} from 'native-base';
import Counter from 'react-native-counter';
import * as Animatable from 'react-native-animatable';

const screen = Dimensions.get('window');

export default class Review extends Component {


  render() {
    return (
      <Animatable.View ref="ReviewCounters" animation="fadeIn" style={[styles.counterContainer]}>
        <Icon name="ios-bonfire-outline"/>
        <Counter end={ 100} start={0} time={1500} style={[styles.macro, styles.calorie]}/> 
        <Counter end={ 100} start={0} time={1500} style={[styles.macro, styles.protein]}/> 
        <Counter end={ 100} start={0} time={1500} style={[styles.macro, styles.fat]}/> 
        <Counter end={ 100} start={0} time={1500} style={[styles.macro, styles.carbohydrate]}/> 
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  counterContainer: {
    flex: 1,
    height: screen.height / 3,
    width: screen.width,
    flexDirection: 'column',
    alignSelf: 'flex-end'
  },
  fullScreen: {
    position: 'relative',
    height: screen.height,
    width: screen.width,
    backgroundColor: 'transparent'
  },
  notVisible: {
    display: 'flex'
  },
  selected: {backgroundColor: 'green', margin: 1, transform: [{scale: 1.05}], height: 80},
  notSelected: {margin: 1, height: 80},
  list: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 22, paddingTop: 7},
  behindList: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 22, paddingTop: 7,height: 80},
  nameAndGroupContainer: {flex: 1, flexDirection: 'column', top: -8, backgroundColor: 'transparent'},
  foodName: {alignItems: 'flex-start', fontSize: 30, fontWeight: '100', display: 'flex', backgroundColor: 'transparent'},
  optionName: {alignItems: 'flex-start', fontSize: 10, fontWeight: '100', backgroundColor: 'transparent'},
  macrosContainer: {flex: 1, flexDirection: 'column', position: 'relative', left: 150, alignSelf: 'flex-start' },
  macrosContainerTop: {alignItems: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 5},
  macrosContainerBottom: {alignItems: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 5},
  macro: {fontSize: 25, fontWeight: '400', padding: 5, marginRight: 5, backgroundColor: 'transparent'},
  calorie: {position: 'absolute', left: -106, top: -8, color: 'red'},
  protein: {position: 'absolute', left: -38, top: -8, color: 'blue'},
  fat: {position: 'absolute', left: -106, top: 24, color: 'yellow'},
  carbohydrate: {position: 'absolute', left: -38, top: 24, color: 'pink'}
})