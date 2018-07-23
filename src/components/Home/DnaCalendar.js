import React from "react";
import {
  View,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Easing
} from "react-native";
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
      <Animated.View
        style={[localStyles.container, { opacity, height, paddingTop }]}
        onLayout={this.onLayout}
      >
        <View>
          <View style={localStyles.mainDateContainer}>
            <DnaHText bold size={3} color={Colors.white} text={moStrOnView} />
            <DnaHText
              size={3}
              color={Colors.white}
              text={yrStrOnView}
              style={{ opacity: 0.8 }}
            />
            <Animated.Image
              source={Img.grayDownArrow}
              style={localStyles.arrow}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={localStyles.datesContainer}
        >
          {datesStrArr.map(this._renderDateStr)}
        </ScrollView>
      </Animated.View>
    );
  }
}

export { DnaCalendar };
