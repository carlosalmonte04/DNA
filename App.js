/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  Linking,
  Platform,
  Keyboard,
  NativeModules,
  StatusBarIOS,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';

import { FullScreenContainer } from 'components/common';
import { EnterLoginModal } from 'components/Authentication';

import { Constants, DEV, ALLOWED_DEEPLINKING_ROUTES, IOS } from 'config/env';
import { Meal } from 'models/meal';

import { setStatusBarHeight, setTopLevelNavigator } from 'actions';
import { ConnectedAppWithNavState } from 'navigation';

const { StatusBarManager } = NativeModules;

if (__DEV__) {
  console.log(`****** DEV * MODE ******`);
  /*
    Enable Remote Config developer mode 
    to allow for frequent refreshes of the cache.
  */
}

console.disableYellowBox = true;

const { SPLASH_TIME } = Constants;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      connectionType: IOS ? 'wifi' : 'wifi',
    };

    // this.checkForCodePushOTA();
  }

  async componentDidMount() {
    // const allowedStorage = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    // );
    const { setIsSplashOver } = this.props;

    this.addAllEventListeners();
    this.getAllUserData();

    setTimeout(() => {
      this.setState({ isLoaded: true }, setIsSplashOver);
    }, SPLASH_TIME);
  }

  componentWillReceiveProps(nextProps) {
    const { rehydrated, appState } = this.props;
    const { rehydrated: nextRehydrated, appState: nextAppState } = nextProps;

    if (!rehydrated && nextRehydrated) {
      this.handleRehydration(nextProps);
    }

    if (appState !== 'active' && nextAppState === 'active') {
      this.checkForCodePushOTA();
    }
  }

  componentWillUnmount() {
    this.removeAllEventListeners();
  }

  getAllUserData = () => {
    if (this.props.user.token) {
      Meal.getAllUserMeals(this.props.user.token);
    }
  };

  addAllEventListeners = async () => {
    // STATUS BAR HEIGHT
    if (IOS) {
      StatusBarManager.getHeight(res => {
        if (res) {
          console.log('***Status Bar - res', res);
          const { height: statusBarHeight } = res;
          this.props.setStatusBarHeight(statusBarHeight);
        }
      });

      this.iosStatusBarHeightListener = StatusBarIOS.addListener(
        'statusBarFrameWillChange',
        res => {
          if (res) {
            const {
              frame: { height: statusBarHeight },
            } = res;
            console.log('***Status Bar - res', res);
            this.props.setStatusBarHeight(statusBarHeight);
          }
        },
      );
    }

    // DEEPLINK
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(this.handleOpenURL);
      const connectionInfo = await NetInfo.getConnectionInfo();
      const { type: connectionType } = connectionInfo;
      this.setState({
        connectionType,
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }

    // INTERNET CONNECTION
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
  };

  removeAllEventListeners = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
    this.iosStatusBarHeightListener.remove();
    Keyboard.dismiss();
  };

  checkForCodePushOTA = () => {
    const enableOTAforDev = false;

    if (!DEV || enableOTAforDev) {
      codePush.sync(
        {
          updateDialog: {
            mandatoryUpdateMessage:
              "There's an update available for Kickwheel!",
            mandatoryContinueButtonLabel: 'Download and Install',
          },
          // checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
          installMode: codePush.InstallMode.IMMEDIATE,
        },
        this.trackCodePushUpdate,
      );
    }
  };

  trackCodePushUpdate = status => {
    switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // Show "downloading" modal
        console.log(`Code Push is downloading an update:`, status);
        this.props.setLoading();
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log(`Code Push is installing an update:`, status);
        // Hide "downloading" modal
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log(`Code Push is up to date:`, status);
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        console.log(`Code Push is syncing...:`, status);
        break;
      default:
        console.log(`Missed all Code Push SyncStatuses`);
        break;
    }
  };

  handleOpenURL = param => {
    /*
      @param
        object:event (IOS)
        string:url (ANDROID)
    */
    const appUrl = IOS ? param.url : param;
    const [, route] = appUrl.split('://'); // for e.g.; "utilitynyckickwheelapp://HelloWorld"
    if (ALLOWED_DEEPLINKING_ROUTES[route]) {
      this.props.customNavigationAction(route);
    }

    if (typeof route === 'string' && route === '') {
      // this.props.customNavigationAction("EnterSignupPassword");
    }
  };

  resetConnectionChangeHandler = () => {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
  };

  handleResetConnChangeHandler = (prevConnectionType, connectionType) => {
    if (prevConnectionType !== connectionType) {
      this.resetConnectionChangeHandler();
    }
  };

  handleConnectionChange = connectionTypeObj => {
    const { connectionType: prevConnectionType } = this.state;
    const { type: connectionType } = connectionTypeObj;
    console.log(
      `**Internet connection changed from`,
      prevConnectionType,
      `to`,
      connectionType,
    );
    this.setState(
      {
        connectionType,
      },
      /* 
        NetInfo does not handle multiple
        connection changes well. Need to reset
        event handler manually on each 
        connection type change
      */
      () =>
        this.handleResetConnChangeHandler(prevConnectionType, connectionType),
    );
  };

  render() {
    const { connectionType } = this.state;
    const { user } = this.props;

    console.log('**** FULL RENDER ****');

    return (
      <FullScreenContainer>
        <ConnectedAppWithNavState />
        {!user._id && <EnterLoginModal />}
      </FullScreenContainer>
    );
  }
}

const mapStateToProps = ({ user, nav }) => {
  return {
    user,
    nav,
  };
};

export default connect(
  mapStateToProps,
  {
    setStatusBarHeight,
  },
)(App);
