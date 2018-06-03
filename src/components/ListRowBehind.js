import React, { Component } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux'
import { List, ListItem, Button, ListView, Text, Icon, Input, Label } from 'native-base'
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import Counter from 'react-native-counter';
const screen = Dimensions.get('window');


const ListRowBehind = (props) => {

    const options = []
    for(let i = 1; options.length < 20; i++) options.push(i)


  handleSelectChange = (prevPortionSize, nextPortionSize) => {
    if (prevPortionSize !== nextPortionSize) props.changePortionSize(nextPortionSize)    
  }
      return (
        <TouchableHighlight underlayColor={"green"}  style={{height: 80, backgroundColor: "#5a8e61", top: '8%', overflow: 'visible' } }>
	        <View style={styles.behindList} >
          <View>
          </View>
	          <View style={{flex: 1, flexDirection: 'column'}}>
	            <View style={{alignSelf: 'flex-end', paddingRight: 4}}><Text style={{fontSize: 12, color: 'white'}}>Portion size</Text>
	              <ModalDropdown style={{alignSelf: 'center', backgroundColor: 'transparent', marginTop: -8 }} 
	              textStyle={{fontWeight: '200', fontSize: 60, color: 'white'}} 
	              defaultValue={"1"} 
	              options={options}
	              dropdownStyle={{left: 290, width: 80, alignItems: 'center', height: '100%'}} 
	              dropdownTextStyle={{ fontWeight: '200', fontSize: 40, alignSelf: 'center'}}
	              onSelect={this.handleSelectChange}
	              />
	            </View>
	          </View>
	        </View>
        </TouchableHighlight>

    )
}

const styles = StyleSheet.create({
  selected: {backgroundColor: 'green', margin: 1, transform: [{scale: 1.05}], height: 70},
  notSelected: {margin: 1, height: 80},
  list: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 22, paddingTop: 7},
  behindList: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 22, paddingTop: 7,height: 80},
  nameAndGroupContainer: {flex: 1, flexDirection: 'column'},
  foodName: {alignItems: 'flex-start', fontSize: 30, fontWeight: '100'},
  foodGroup: {alignItems: 'flex-start', fontSize: 10, fontWeight: '100'},
  macrosContainer: {alignItems: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 5},
  macro: {fontSize: 20, fontWeight: '300', paddingRight: 8, paddingBottom: 30},
  calorie: {color: 'red'},
  protein: {color: 'blue'},
  fat: {color: 'yellow'},
  carbohydrate: {color: 'pink'}

})

export default ListRowBehind