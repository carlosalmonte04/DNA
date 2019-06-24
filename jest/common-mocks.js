// Avoid repetition on test files by adding common required mocks here.
// https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock

jest.mock('react-native', () => {
  const ReactNative = require.requireActual('react-native');
  ReactNative.NativeModules.RNRestart = {
    Restart: jest.fn(),
  };
  ReactNative.NativeModules.ReactNativePayments = {
    supportedGateways: ['firstdata'],
  };
  ReactNative.NativeModules.RNADBMobileConfig = {
    APPLICATION_TYPE_HANDHELD: 'APPLICATION_TYPE_HANDHELD',
    APPLICATION_TYPE_WEARABLE: 'APPLICATION_TYPE_WEARABLE',
    MOBILE_PRIVACY_STATUS_OPT_IN: 'MOBILE_PRIVACY_STATUS_OPT_IN',
    MOBILE_PRIVACY_STATUS_OPT_OUT: 'MOBILE_PRIVACY_STATUS_OPT_OUT',
    MOBILE_PRIVACY_STATUS_UNKNOWN: 'MOBILE_PRIVACY_STATUS_UNKNOWN',
    setAdvertisingIdentifier: jest.fn(),
  };
  ReactNative.NativeModules.RNADBMobileAnalytics = {
    PROXIMITY_FAR: 'PROXIMITY_FAR',
    PROXIMITY_IMMEDIATE: 'PROXIMITY_IMMEDIATE',
    PROXIMITY_NEAR: 'PROXIMITY_NEAR',
    PROXIMITY_UNKNOWN: 'PROXIMITY_UNKNOWN',
    trackState: jest.fn(),
    trackAction: jest.fn(),
  };
  ReactNative.NativeModules.RNADBMobileVisitor = {
    AUTH_STATE_AUTHENTICATED: 'AUTH_STATE_AUTHENTICATED',
    AUTH_STATE_LOGGED_OUT: 'AUTH_STATE_LOGGED_OUT',
    AUTH_STATE_UNKNOWN: 'AUTH_STATE_UNKNOWN',
  };
  ReactNative.AppState = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  return ReactNative;
});

jest.mock('NativeEventEmitter');

jest.mock('NativeAnimatedHelper');

jest.mock('react-native-safe-area-view', () => {
  const Mock = require.requireActual('react-native-safe-area-view');
  Mock.SafeView = props => props.children;
  Mock.default = props => props.children;
  return Mock;
});

jest.mock('react-native-splash-screen', () => ({
  show: () => {},
  hide: () => {},
}));

jest.mock('react-native-device-info', () => ({
  getVersion: () => '6.1.4',
  is24Hour: () => true,
  getTimezone: () => 'America/New_York',
  getDeviceCountry: () => 'US',
  getFontScale: () => 1,
  getDeviceLocale: jest.fn(),
}));

jest.mock('react-native-awesome-card-io', () => ({
  // Mock these values, since they come from native modules
  CardIOUtilities: {
    DETECTION_MODE: {
      AUTOMATIC: '',
      IMAGE_AND_NUMBER: '',
      IMAGE: '',
    },
  },
}));

jest.mock('react-native-device-brightness', () => ({
  setBrightnessLevel: jest.fn(),
  getBrightnessLevel: jest.fn(),
}));

jest.mock('bugsnag-react-native', () => ({
  Client: () => ({
    clearUser: jest.fn(),
    notify: jest.fn(),
    setUser: jest.fn(),
  }),
  Configuration: jest.fn(),
}));

jest.mock('TouchableNativeFeedback', () => {
  const Mock = require.requireActual('TouchableNativeFeedback');
  Mock.SelectableBackground = () => {};
  return Mock;
});

jest.mock('react-native-calendar-events', () => ({
  authorizationStatus: () => {},
  authorizeEventStore: () => {},
  findCalendars: () => {},
  saveEvent: () => {},
}));

jest.mock('react-native-cookies', () => ({
  setFromResponse: () => {},
}));

jest.mock('react-native-config', () => ({
  ENABLE_DEV_MENU: 'true',
}));

jest.spyOn(Date, 'now').mockImplementation(() => 0);

jest.mock('react-native-sound', () => 'Sound');

jest.mock('react-native-geolocation-service', () => {});

jest.mock('react-native-music-control', () => ({
  enableControl: () => {},
  enableBackgroundMode: () => {},
  handleAudioInterruptions: () => {},
}));

jest.mock('react-native-fs', () => ({}));

jest.mock('react-native-open-maps', () => ({
  createOpenLink: jest.fn(),
}));

// there is no way to fail the test, so keep it in a global
// and we can check later, such as in testSaga()
global.fatalErrors = [];

jest.mock('axios', () => {
  const Mock = require.requireActual('axios');
  Mock.Axios.prototype.request = jest.fn(config => {
    const name = config.method ? config.method.toLowerCase() : 'request';
    // NOTE: message prefix is matched by scripts/check-tests.sh!
    const message = `test did not stub Axios.prototype.${name}(): ${JSON.stringify(
      config,
      undefined,
      2,
    )}`;
    // eslint-disable-next-line no-console
    console.error(message);
    const e = new Error(message);

    global.fatalErrors.push(e);

    throw e;
  });
  return Mock;
});

global.actualFetch = global.fetch;
global.fetch = jest.fn((...args) => {
  // NOTE: message prefix is matched by scripts/check-tests.sh!
  const message = `test did not stub fetch(): ${JSON.stringify(
    args,
    undefined,
    2,
  )}`;
  // eslint-disable-next-line no-console
  console.error(message);
  const e = new Error(message);

  global.fatalErrors.push(e);

  throw e;
});

jest.mock('redux-saga/lib/internal/utils', () => {
  const Mock = require.requireActual('redux-saga/lib/internal/utils');
  Mock.actualDelay = Mock.delay;
  Mock.delay = jest.fn(() => Mock.actualDelay(1));
  return Mock;
});

jest.mock('react-native-sfmobilepush', () => ({
  addTag: () => Promise.resolve(),
  checkPermissions: () => Promise.resolve(true),
  getAttribute: () => Promise.resolve('attribute'),
  getSubscriberKey: () => Promise.resolve('subscriberKey'),
  getTags: () => () => Promise.resolve([]),
  init: () => Promise.resolve(),
  removeTag: () => Promise.resolve(),
  setAttribute: () => Promise.resolve(),
  setSubscriberKey: () => Promise.resolve(),
}));

jest.mock('react-native-healthkit', () => ({
  requestPermissions: () => Promise.resolve(),
  getWritePermissionStatus: () =>
    Promise.resolve('AuthorizationStatusSharingNotDetermined'),
  isAvailable: false,
  getDateOfBirth: () => Promise.resolve(),
  addWorkout: () => Promise.resolve(),
  getWorkouts: () => Promise.resolve([]),
  getWorkoutsByMetadata: () => Promise.resolve([]),
  deleteWorkoutsByMetadata: () => Promise.resolve(false),
  editWorkoutByMetadata: () => Promise.resolve(false),
  Constants: {
    writePermissionStatus: {
      authorized: 'AuthorizationStatusSharingAuthorized',
      denied: 'AuthorizationStatusSharingDenied',
      notDetermined: 'AuthorizationStatusSharingNotDetermined',
    },
    units: {
      calories: 'Calories',
      kilo: 'Kilo',
      pounds: 'Pounds',
    },
    dataTypes: {
      dateOfBirth: 'DateOfBirth',
      workouts: 'Workouts',
    },
    workoutActivityTypes: {},
    quantities: {},
  },
}));

jest.mock('react-native-view-shot', () => ({
  captureRef: jest.fn(),
}));

jest.mock('react-native-inappbrowser-reborn', () => ({
  close: jest.fn(),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    GestureHandler: {},
    Directions: {},
  };
});
