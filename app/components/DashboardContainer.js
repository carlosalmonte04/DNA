import React, { Component } from 'react';
import { StyleSheet, Navigator, Image, View, Link, Dimensions, FlatList, ScrollView, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import * as Progress from 'react-native-progress';
import moment from 'moment'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Drawer from 'react-native-drawer-menu';
import { Container, Content, InputGroup, Input, Icon, Button, Text, Form, Title, Item, Label, List, Header} from 'native-base';
import fetchAllMeals from '../actions/meals/fetchAllMeals'
import changeDisplayingMeal from '../actions/ui/changeDisplayingMeal'
import Menu from './Menu'
import Meal from './Meal'
import Dashboard from './Dashboard'
import WelcomeLoginForm from './WelcomeLoginForm'
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modalbox';

const screen = Dimensions.get('window');

class DashboardContainer extends Component {

  state = {
    selectedDates: {},
    displayingMeals: [],
    markedDates: {},
    datesAndMeals: {},
  }

  openMenu = () => {
    this.refs.menu.openDrawer()
  }

  render() {
    return (
      <Container>
        <Drawer
        ref="menu"
        displayLoadingIndicator={this.props.isLoading}
        style={styles.container}
        drawerWidth={300}
        drawerContent={<Menu navigation={this.props.navigation}/>}
        type={Drawer.types.Overlay}
        drawerPosition={Drawer.positions.Right}
        onDrawerOpen={() => {}}
        onDrawerClose={() => {}}
        easingFunc={Easing.ease}
      >
        {this.props.isLoggedIn ? <Dashboard openMenu={this.openMenu}/> : <WelcomeLoginForm />} 
        <Modal
          style={[styles.modal, styles.modal1]}
          ref={"mealModal"}
          swipeToClose={true}
          backdrop={true}
          backdropPressToClose={true}
          isOpen={!!this.props.displayingMeal}
          onClosed={() => this.props.changeDisplayingMeal(null)}>
            <Meal meal={this.props.displayingMeal}/>
        </Modal>
      </Drawer>
    </Container>
    );
  }
}

var styles = StyleSheet.create({
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },
});

function mapStateToProps(state) {
  return {
    meals: state.meals.all,
    displayingMeal: state.ui.displayingMeal,
    isLoading: state.ui.isLoading,
    isLoggedIn: state.ui.isLoggedIn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllMeals: () => dispatch(fetchAllMeals()),
    changeDisplayingMeal: (meal) => dispatch(changeDisplayingMeal(meal)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)