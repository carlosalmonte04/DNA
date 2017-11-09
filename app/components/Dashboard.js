import React, { Component } from 'react';
import { StyleSheet, Navigator, Image, View, Link, Dimensions, FlatList, ScrollView, Easing, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import SwipeALot from 'react-native-swipe-a-lot'
import * as Progress from 'react-native-progress';
import moment from 'moment'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Container, Content, InputGroup, Input, Icon, Button, Text, Form, Title, Item, Label, List, Header, Left, Right, Body, Subtitle} from 'native-base';
import fetchAllMeals from '../actions/meals/fetchAllMeals'
import changeDisplayingMeal from '../actions/ui/changeDisplayingMeal'
import ListDashboard from './ListDashboard'
import Menu from './Menu'
import LinearGradient from 'react-native-linear-gradient';

const screen = Dimensions.get('window');

const today  = moment().format('YYYY-MM-DD')

class Dashboard extends Component {

  state = {
    markedDates: {},
    datesAndMeals: {[moment().format('YYYY-MM-DD')]: []},
    caloriePercent: this._getDailyPercent("calorie", today) || 0,
    proteinPercent: this._getDailyPercent("protein", today) || 0,
    fatPercent: this._getDailyPercent("fat", today) || 0,
    carbohydratePercent: this._getDailyPercent("carbohydrate", today) || 0,
    dailyGoalPercent: this._getDailyPercent("dailyGoal", today) || 0, 

  }

  openMenu = () => {
    this.props.openMenu() 
  }

  _getDailyPercent(macro, date, forDailyGoal = false) {
    const mealsThisDate = this.props.meals.filter(meal => meal.createdAt.includes(moment(date).format('YYYY-MM-DD')))
    const macrosConsumedCollection = mealsThisDate.map(meal => parseInt(meal.macros()[macro] || 0))
    const totalMacrosThisDate      =  macrosConsumedCollection.length === 0 ? 1 : macrosConsumedCollection.reduce((macrosTotal, macros) => macrosTotal + macros)
    if (forDailyGoal) return totalMacrosThisDate
    switch (macro) {
      case "calorie":
        return (Math.round(totalMacrosThisDate) / this.props.user.getCaloricRequirement())
      case "protein":
        return (Math.round(totalMacrosThisDate) / this.props.user.getProteinRequirement())
      case "fat":
        return (Math.round(totalMacrosThisDate) / this.props.user.getFatRequirement())
      case "carbohydrate":
        return (Math.round(totalMacrosThisDate) / this.props.user.getCarbohydrateRequirement())
      case "dailyGoal":
        const allMacrosEaten = [
          this._getDailyPercent("calorie", date, true),
          this._getDailyPercent("protein", date, true),
          this._getDailyPercent("fat", date, true),
          this._getDailyPercent("carbohydrate", date, true),
          ].reduce((macrosTotal, macros) => macrosTotal + macros)
        const allRequirements = [
          this.props.user.getCaloricRequirement(),
          this.props.user.getProteinRequirement(),
          this.props.user.getFatRequirement(),
          this.props.user.getCarbohydrateRequirement(),
          ].reduce((macrosTotal, macros) => macrosTotal + macros)
          return (allMacrosEaten / allRequirements)
      default:
        return 0
    }

  }

  handleDayPress = (date) => {
    date = date.dateString
    if (!this.state.datesAndMeals[date]) {
      this.setState({
        datesAndMeals: {...this.state.datesAndMeals, [date]: []},
        caloriePercent: this._getDailyPercent("calorie", date),
        proteinPercent: this._getDailyPercent("protein", date),
        fatPercent: this._getDailyPercent("fat", date),
        carbohydratePercent: this._getDailyPercent("carbohydrate", date),
        dailyGoalPercent: this._getDailyPercent("dailyGoal", date),
      })
    }
    else {
      this.setState({
        caloriePercent: this._getDailyPercent("calorie", date),
        proteinPercent: this._getDailyPercent("protein", date),
        fatPercent: this._getDailyPercent("fat", date),
        carbohydratePercent: this._getDailyPercent("carbohydrate", date),
        dailyGoalPercent: this._getDailyPercent("dailyGoal", date),
      })
    }
  }

  _renderPieCharts = () => {
    return (
      <View style={{height: screen.height / 2.7}}>
        <View>
          <View style={{padding: 5, alignSelf: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'column', margin: 10}}>
                <Progress.Circle textStyle={{fontSize: 22, fontWeight: 'bold'}} showsText={true} thickness={2} borderWidth={1}  color={'black'} progress={this.state.caloriePercent || 0} size={80} animated={true} indeterminate={false}/>
                <Text style={styles.label}>Calories</Text>
                <Progress.Circle textStyle={{fontSize: 22, fontWeight: 'bold'}} showsText={true}  showsText={true} thickness={2} borderWidth={1}  color={'#696e68'} progress={this.state.proteinPercent || 0} size={80} animated={true} indeterminate={false} style={{top: 10}}/>
                <Text style={{color: 'white', backgroundColor: 'transparent', alignSelf: 'center', fontWeight: '400', top: 10}}>Protein</Text>
              </View>
              <View style={{top: 20}}>
                <Progress.Pie  thickness={2} borderWidth={3} color={'#696e68'} showsText={true} progress={this.state.dailyGoalPercent || 0} size={170} animated={true} indeterminate={false} style={{height: '79%'}}/>
                <Text style={{color: 'white', backgroundColor: 'transparent', alignSelf: 'center', fontWeight: '400'}}>Daily goal</Text>
              </View>
              <View style={{flexDirection: 'column', margin: 10}}>
                <Progress.Circle textStyle={{fontSize: 22, fontWeight: 'bold'}} showsText={true} thickness={2} borderWidth={1}  color={'#696e68'} progress={this.state.fatPercent || 0} size={80} animated={true} indeterminate={false} />
                <Text style={styles.label}>Fat</Text>
                <Progress.Circle textStyle={{fontSize: 22, fontWeight: 'bold'}} showsText={true}  thickness={2} borderWidth={1}  color={'#696e68'} progress={this.state.carbohydratePercent || 0} size={80} animated={true} indeterminate={false} style={{top: 10}}/>
                <Text style={{color: 'white', backgroundColor: 'transparent', alignSelf: 'center', fontWeight: '400', fontSize: 12, top: 10}}>Carbohydrates</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderCalendarDay = (day) => {
    if (day) {
      return (
        <View style={{width: "20%", alignItems: 'center'}}>
          <Text style={{fontWeight: '100', fontSize: 28}}>{moment(day.dateString).format('DD')}</Text>
          <Text style={{fontWeight: '100', fontSize: 24}}>{moment(day.dateString).format('ddd')}</Text>
        </View>
      )
    }
    else {
      return (
        <View style={{width: "20%"}}>
          <Text style={{fontWeight: '100', fontSize: 16}}></Text>
        </View>
      )
    }
  }

  _renderCalendarItem = (meal, firstItemInDay) => {
    return (
      <ListDashboard key={meal._id} meal={meal} changeDisplayingMeal= {this.props.changeDisplayingMeal}/>
    )
  }

  _renderEmptyItem = (date) => {
    return (
      <View style={{top: 10}}>
        <View style={{height: 110, backgroundColor: "transparent", padding: 4, bottom: 8, margin: 1, borderRadius: 5} }>
          <View style={styles.list} >
            <View style={{height: "100%", width: "40%", alignItems: 'center'}}>
              <Text>No meal to display</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  prepareCalendar = () => {
    let markedDates = {}
    let datesAndMeals = {}


    this.props.meals.forEach((meal, idx, mealsCollection) => {
      const mealDate = moment(meal.createdAt).format('YYYY-MM-DD')
      if (!markedDates[mealDate]) {

        markedDates[mealDate] = {marked: true}
        datesAndMeals[mealDate] = mealsCollection.filter(mealInFilter => moment(mealInFilter.createdAt).format('YYYY-MM-DD') === mealDate)
      }
    })
    // if no meals today
    if (!datesAndMeals[today]) datesAndMeals[today] = []

    this.handleDayPress({dateString: today}) // <-- to update pie charts manually

    this.setState({markedDates, datesAndMeals}) 
  }

  componentDidMount() {
    if (this.props.meals.length === 0) {
      setTimeout( () => {
        this.props.fetchAllMeals().then(meals => this.prepareCalendar())
      }, 1000)
    }
    else {
      setTimeout(this.prepareCalendar, 1000)
    }

  }

  render() {
    return (
        <LinearGradient colors={['#fff', '#fff', '#fff']}>
         <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{fontWeight: '300', bottom: 5, fontSize: 24}}>{moment().format('MMM YYYY')}</Title>
            </Body>
            <Right>
              <TouchableOpacity onPress={this.openMenu}>
                <Image source={require('../assets/img/user-male.png')} style={{height: 35, width: 35, margin: 10, bottom:8}}/>
              </TouchableOpacity>
            </Right>
          </Header>

        <View style={{height: screen.height / 2, padding: 5}}>
          <Agenda
            // the list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key kas to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={this.state.datesAndMeals}
            // callback that gets called when day changes while scrolling agenda list
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2012-05-10'}
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            onDayPress={date => this.handleDayPress(date)}
            selected={today}
            // specify how each item should be rendered in agenda
            renderItem={(item, firstItemInDay) => {return (this._renderCalendarItem(item, firstItemInDay));}}
            // specify how each date should be rendered. day can be undefined if the item is not first in that day.
            renderDay={(day, item) => {return (this._renderCalendarDay(day, item));}}
            // specify how empty date content with no items should be rendered
            renderEmptyDate={(date) => {return (this._renderEmptyItem(date))}}
            // specify how agenda knob should look like
            renderKnob={() => {return (<View style={{borderRadius: 10, backgroundColor: 'gray', height: 10, width: 40}}></View>);}}
            // specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
            // agenda theme
            theme={{
              agendaDayTextColor: 'yellow',
              agendaDayNumColor: 'green',
              agendaTodayColor: 'red',
              agendaKnobColor: 'blue'
            }}
            // agenda container style
            style={{borderRadius: 4, backgroundColor: "#000"}}
          />
        </View>
        {this._renderPieCharts()}
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: '#384a38',
    shadowOffset: {width: 0, height: 0}, 
    shadowOpacity: 0.8,
  },
  label: {
    color: 'white', 
    backgroundColor: 'transparent', 
    alignSelf: 'center', 
    fontWeight: '400'
  }
});

function mapStateToProps(state) {
  return {
    meals: state.meals.all,
    isLoading: state.ui.dashboardLoading,
    user: state.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllMeals: () => dispatch(fetchAllMeals()),
    changeDisplayingMeal: (meal) => dispatch(changeDisplayingMeal(meal))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)