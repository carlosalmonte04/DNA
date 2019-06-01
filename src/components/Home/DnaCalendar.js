import React from "react";
import {
  View,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing
} from "react-native";
import { Agenda } from 'react-native-calendars';
import moment from "moment";
import { DnaHText, DnaPText } from "@dnaCommon";
import { Colors, WIDTH, DEFAULT_STATUS_BAR_HEIGHT, Img } from "@dnaAssets";
import { defaultRefs } from "@dnaConfig";

const localStyles = StyleSheet.create({
  container: {
    width: WIDTH,
    paddingHorizontal: 16,
    marginBottom: 8
  },
  mainDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH * 0.4,
    justifyContent: "space-around"
  },
  arrow: {
    width: 15
  },
  dateContainer: {
    marginHorizontal: 16
  },
  datesContainer: {
    alignItems: "flex-end"
  }
});

const DEFAULT_CAL_DAY_STR = {
  sameDay: "[Today]",
  nextDay: "[Tomorrow]",
  nextWeek: "dddd",
  lastDay: "[Yesterday]",
  lastWeek: "dddd",
  sameElse: "MM/DD/YY"
};

const getDateStrArr = (startDate, weeksAgo) => {
  let i = 0;
  const days = weeksAgo * 7;
  const dateStrsArr = [];
  while (i < days) {
    console.log(`Hello`, i);
    const dateStr = startDate.subtract(i, "days").calendar(null, {
      sameDay: "[Today]",
      lastDay: "D MMM",
      sameElse: "D MMM",
      nextDay: "D MMM",
      nextWeek: "D MMM",
      lastWeek: "D MMM"
    });

    dateStrsArr.push(dateStr);
    i += 1;
  }
  console.log(`dateStrsArr`, dateStrsArr);
  return dateStrsArr;
};

class DnaCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      moStrOnView: moment().format("MMMM"),
      yrStrOnView: moment().format("YYYY"),
      datesStrArr: getDateStrArr(moment(), 1),
      height: undefined,
      layedOut: false
    };

    console.log(`AKDJSNFLKSDNFA`, this.state.dateStrs);
    this.dateStrOnView = moment().format();
    this.animVal = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    const { hide, midway } = this.props;
    const { hide: nextHide, midway: nextMidway } = nextProps;

    if (!hide && nextHide) {
      this.animOut();
    } else if (hide && !nextHide) {
      this.animIn();
    }

    if (!midway && nextMidway) {
      this.animMidwayOut();
    } else if (midway && !nextMidway) {
      this.animMidwayIn();
    }
  }

  animMidwayOut = () => {
    Animated.timing(this.animVal, {
      toValue: 0.5,
      duration: 200,
      easing: Easing.linear()
    }).start();
  };

  animMidwayIn = () => {
    Animated.timing(this.animVal, {
      toValue: 0,
      duration: 200,
      easing: Easing.elastic(0.7)
    }).start();
  };

  animOut = () => {
    Animated.timing(this.animVal, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear()
    }).start();
  };

  animIn = () => {
    Animated.timing(this.animVal, {
      toValue: 0,
      duration: 200,
      easing: Easing.elastic(0.7)
    }).start();
  };

  _renderDateStr = (dateStr, index) => {
    return (
      <View style={localStyles.dateContainer}>
        <TouchableWithoutFeedback key={dateStr} onPress={defaultRefs.nullFunc}>
          <DnaHText
            bold
            size={!index ? 1 : 4}
            color={Colors.white}
            text={dateStr}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  onLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }) => {
    if (this.state.layedOut) {
      return;
    }

    this.setState({
      height,
      layedOut: true
    });
  };

  render() {
    const { moStrOnView, yrStrOnView, datesStrArr } = this.state;

    const opacity = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1]
    });

    const height = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.height, 0]
    });

    const paddingTop = this.animVal.interpolate({
      inputRange: [0, 1],
      outputRange: [DEFAULT_STATUS_BAR_HEIGHT, 10]
    });

    return (
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={{
          '2012-05-22': [{text: 'item 1 - any js object'}],
          '2012-05-23': [{text: 'item 2 - any js object'}],
          '2012-05-24': [],
          '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}]
        }}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {console.log('trigger items loading')}}
        // callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
        // callback that gets called on day press
        onDayPress={(day)=>{console.log('day pressed')}}
        // callback that gets called when day changes while scrolling agenda list
        onDayChange={(day)=>{console.log('day changed')}}
        // initially selected day
        selected={'2012-05-16'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2012-05-30'}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {return (<View />);}}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => {return (<View />);}}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => {return (<View />);}}
        // specify how agenda knob should look like
        renderKnob={() => {return (<View />);}}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData = {() => {return (<View />);}}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
        // Hide knob button. Default = false
        hideKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          '2012-05-16': {selected: true, marked: true},
          '2012-05-17': {marked: true},
          '2012-05-18': {disabled: true}
        }}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        // agenda theme
        theme={{
          backgroundColor: 'green',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
          indicatorColor: 'blue',
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
        // agenda container style
      />
    );
  }
}

export { DnaCalendar };
