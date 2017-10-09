import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux'
import { List, ListItem, Button, ListView, Text, Icon, Input, Label } from 'native-base'

import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from 'react-native-counter';
const screen = Dimensions.get('window');


export default class ListRowDashboardFront extends Component {

  render() {
    return (
      <TouchableHighlight ref="view" underlayColor={"white"} onPress={this.handlePress} onLongPress={this.handleLongPress} style={{margin: 1, height: 90, backgroundColor: "white", borderWidth: 2, borderColor: this.props.isSelected ? "green" : "transparent" } }>
        <View animation="pulse" style={styles.list} >
          <View style={styles.nameAndGroupContainer}>
            <Text style={styles.foodName}>{this.props.meal.name}</Text>
          </View>
      <View style={styles.macrosContainerleft}>
        <View style={styles.macrosContainer}>
          <Text style={[styles.macro]}><Icon name="ios-flash-outline" style={{fontSize: 40, color: "#7c4a31",}}/> {parseInt(this.props.meal.macros().calorie)}</Text>
          <Text style={[styles.macro]}><Icon name="ios-ionic-outline" style={{fontSize: 40, color: "#38387d",}}/> {parseInt(this.props.meal.macros().protein)}</Text>
        </View>
        <View style={styles.macrosContainerRight}>
          <Text style={[styles.macro]}><Icon name="ios-flower-outline" style={{fontSize: 40, color: "#c3b042",}}/> {parseInt(this.props.meal.macros().fat)}</Text>
          <Text style={[styles.macro]}><Icon name="ios-ice-cream-outline" style={{fontSize: 40, color: "#7c3c4e",}}/> {parseInt(this.props.meal.macros().carbohydrate)}</Text>
        </View>
      </View>
        </View>
      </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
  selected: {backgroundColor: 'green', margin: 1, transform: [{scale: 1.05}], height: 80},
  notSelected: {margin: 1, height: 80},
  list: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 22, paddingTop: 7},
  behindList: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 22, paddingTop: 7,height: 80},
  nameAndGroupContainer: {flex: 1, flexDirection: 'column', top: 0, backgroundColor: 'transparent'},
  foodName: {alignItems: 'flex-start', fontSize: 30, fontWeight: '300', display: 'flex', backgroundColor: 'transparent', color: "#383857"},
  optionName: {alignItems: 'flex-start', fontSize: 10, fontWeight: '100', backgroundColor: 'transparent'},
  macrosContainer: {flex: 1, flexDirection: 'row', position: 'relative', alignItems: 'baseline', bottom: 10, left: -5},
  macrosContainerLeft: {alignItems: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 5},
  macrosContainerRight: {alignItems: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 5},
  macro: {fontSize: 16, fontWeight: '200', padding: 5, marginBottom: -10, backgroundColor: 'transparent'},
  calorie: {position: 'absolute', left: -106, top: -8, color: 'red'},
  protein: {position: 'absolute', left: -38, top: -8, color: 'blue'},
  fat: {position: 'absolute', left: -106, top: 24, color: 'yellow'},
  carbohydrate: {position: 'absolute', left: -38, top: 24, color: 'pink'}
})