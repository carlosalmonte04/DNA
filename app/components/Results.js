import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, FlatList, Animated, ListView } from 'react-native';
import { ListItem, Button } from 'native-base'
import ListAnalyser from './ListAnalyser'
import LinearGradient from 'react-native-linear-gradient';


import * as Animatable from 'react-native-animatable';


const screen = Dimensions.get('window');

export default class Results extends Component {

  render() {
    return (
      <LinearGradient colors={['#fff', '#fff', '#fff']} style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{height: screen.height / 1.8, position: 'relative'}}>
          <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '100', backgroundColor: 'transparent', fontFamily: 'Bayformance'}}>
            Select food from options
          </Text>
          <FlatList data={this.props.foods} renderItem={(food, idx) => <ListAnalyser key={idx} meal={this.props.meal} food={food.item}/> }/>
        </View>
        <View style={{padding: 10}}>
        <View>
        </View>
        </View>
      </LinearGradient>
    )
  }
}

