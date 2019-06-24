import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  Button,
  ListView,
  Text,
  Icon,
  Input,
  Label,
} from 'native-base';

import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from 'react-native-counter';
const screen = Dimensions.get('window');

export default class ListRowFront extends Component {
  handlePress = () => {
    this.props.handleListPress();
  };

  handleCounterComplete = () => {
    this.setState({
      counterAnimationOver: true,
    });
  };

  handleOptionChange = change => {
    console.log('CHANGE', change);
  };

  _renderCounters = () => {
    return (
      <View style={styles.macrosContainer}>
        <View style={styles.macrosContainerTop}>
          <Counter
            end={this.props.food.macros.calorie * this.props.food.portionSize}
            start={0}
            time={1500}
            style={[styles.macro, styles.calorie]}
            onComplete={this.handleCounterComplete}
          />
          <Counter
            end={this.props.food.macros.protein * this.props.food.portionSize}
            start={0}
            time={1500}
            style={[styles.macro, styles.protein]}
            onComplete={this.handleCounterComplete}
          />
        </View>
        <View style={styles.macrosContainerBottom}>
          <Counter
            end={this.props.food.macros.fat * this.props.food.portionSize}
            start={0}
            time={1500}
            style={[styles.macro, styles.fat]}
            onComplete={this.handleCounterComplete}
          />
          <Counter
            end={
              this.props.food.macros.carbohydrate * this.props.food.portionSize
            }
            start={0}
            time={1500}
            style={[styles.macro, styles.carbohydrate]}
            onComplete={this.handleCounterComplete}
          />
        </View>
      </View>
    );
  };

  _renderPlainTexts = () => {
    return (
      <View style={styles.macrosContainer}>
        <View>
          <Text style={[styles.macro]}>
            <Icon name="home" />:{' '}
            {parseInt(this.props.food.macros.calorie.value)}
          </Text>
          <Text style={[styles.macro]}>
            <Icon name="home" />:{' '}
            {parseInt(this.props.food.macros.protein.value)}
          </Text>
        </View>
        <View>
          <Text style={[styles.macro]}>
            <Icon name="home" />: {parseInt(this.props.food.macros.fat.value)}
          </Text>
          <Text style={[styles.macro]}>
            <Icon name="home" />:{' '}
            {parseInt(this.props.food.macros.carbohydrate.value)}
          </Text>
        </View>
      </View>
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.portionSize !== nextProps.portionSize) {
      console.log('log state', store.getState());
    }
  }

  render() {
    return (
      <TouchableHighlight
        ref="view"
        underlayColor={'#cfd3d3'}
        onPress={this.handlePress}
        style={{
          margin: 1,
          height: 90,
          backgroundColor: '#dedede',
          borderWidth: 2,
          borderColor: this.props.isSelected ? '#8234FF' : 'transparent',
        }}
      >
        <View animation="pulse" style={styles.list}>
          <View style={styles.nameAndGroupContainer}>
            <Text style={styles.foodName}>{this.props.food.name}</Text>
            <ModalDropdown
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
                width: '100%',
              }}
              textStyle={{ fontSize: 18, color: '#8234FF' }}
              defaultValue={'See Options'}
              options={this.props.food.options.map(food => food.name)}
              dropdownStyle={{ left: 290, alignItems: 'center' }}
              dropdownTextStyle={{
                fontWeight: '200',
                fontSize: 22,
                width: screen.width / 1.2,
              }}
              onSelect={this.handleOptionChange}
            />
          </View>
          <View style={styles.macrosContainerleft}>
            <View style={styles.macrosContainer}>
              <Text style={[styles.macro]}>
                <Icon
                  name="ios-flash-outline"
                  style={{ fontSize: 40, color: '#7c4a31' }}
                />{' '}
                {parseInt(
                  this.props.food.macros.calorie.value *
                    this.props.food.portionSize,
                )}
              </Text>
              <Text style={[styles.macro]}>
                <Icon
                  name="ios-ionic-outline"
                  style={{ fontSize: 40, color: '#38387d' }}
                />{' '}
                {parseInt(
                  this.props.food.macros.protein.value *
                    this.props.food.portionSize,
                )}
              </Text>
            </View>
            <View style={styles.macrosContainerRight}>
              <Text style={[styles.macro]}>
                <Icon
                  name="ios-flower-outline"
                  style={{ fontSize: 40, color: '#c3b042' }}
                />{' '}
                {parseInt(
                  this.props.food.macros.fat.value *
                    this.props.food.portionSize,
                )}
              </Text>
              <Text style={[styles.macro]}>
                <Icon
                  name="ios-ice-cream-outline"
                  style={{ fontSize: 40, color: '#7c3c4e' }}
                />{' '}
                {parseInt(
                  this.props.food.macros.carbohydrate.value *
                    this.props.food.portionSize,
                )}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: 'green',
    margin: 1,
    transform: [{ scale: 1.05 }],
    height: 80,
  },
  notSelected: { margin: 1, height: 80 },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingTop: 7,
  },
  behindList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 22,
    paddingTop: 7,
    height: 80,
  },
  nameAndGroupContainer: {
    flex: 1,
    flexDirection: 'column',
    top: 0,
    backgroundColor: 'transparent',
  },
  foodName: {
    alignItems: 'flex-start',
    fontFamily: 'Bayformance',
    fontSize: 40,
    display: 'flex',
    backgroundColor: 'transparent',
    color: '#383857',
  },
  optionName: {
    alignItems: 'flex-start',
    fontSize: 10,
    fontWeight: '100',
    backgroundColor: 'transparent',
  },
  macrosContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'baseline',
    bottom: 10,
    left: -5,
  },
  macrosContainerLeft: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 5,
  },
  macrosContainerRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingRight: 10,
    paddingTop: 5,
  },
  macro: {
    fontSize: 16,
    fontWeight: '200',
    padding: 5,
    marginBottom: -10,
    backgroundColor: 'transparent',
  },
  calorie: { position: 'absolute', left: -106, top: -8, color: 'red' },
  protein: { position: 'absolute', left: -38, top: -8, color: 'blue' },
  fat: { position: 'absolute', left: -106, top: 24, color: 'yellow' },
  carbohydrate: { position: 'absolute', left: -38, top: 24, color: 'pink' },
});

const groupColors = {
  'American Indian': 'pink',
  'baby foods': 'red',
  'baked products': 'blue',
  beverages: 'pink',
  breakfast: 'pink',
  'cereal grains': 'yellow',
  'diary and egg': 'blue',
  'fast foods': 'green',
  'fats and oil': 'black',
  finfish: 'blue',
  'fruits and fruit juices': 'yellow',
  lamb: 'grey',
  legumes: 'white',
  'meals, entree': 'blue',
  'nut and seeds': 'black',
  pork: 'magenta',
  poultry: 'violet',
  restaurant: 'blue',
  sausages: 'red',
  snacks: 'yellow',
  soups: 'black',
  spices: 'yellow',
  sweets: 'teal',
  vegetables: 'blue',
  Unclassified: 'white',
};
