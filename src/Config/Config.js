import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { API_URL, API_URL_DEV, USDA_KEY } from "react-native-dotenv";

const deviceName = DeviceInfo.getDeviceName();
const deviceModel = DeviceInfo.getModel();
const appVersionNumber = `v${DeviceInfo.getVersion()}`;
const rawAppVersionNumber = DeviceInfo.getVersion();
const appBuildVersion = `${DeviceInfo.getBuildNumber()}`;
const appBundleIdentifier = `${DeviceInfo.getBundleId()}`;

/*
  change API location here
  dev or prod
*/

const SERVE_DEV_API = false;

export const ALLOWED_DEEPLINKING_ROUTES = {
  "": true,
};

// process.env.NODE_ENV = "production";
export const DEVICE_INFO = {
  deviceName,
  deviceModel,
  appVersionNumber,
  appBuildVersion,
  appBundleIdentifier,
  rawAppVersionNumber,
  pointingTo: API_URL.includes("localhost") ? "staging" : "production",
};

export const ENV = {
  API_URL: SERVE_DEV_API ? API_URL_DEV : API_URL,
  USDA_KEY,
};

export const DEV = process.env.NODE_ENV === "development";

export const homeTabNames = {
  Directory: true,
  Forums: true,
  Messages: true,
  Profile: true,
};

export const Constants = {
  SPLASH_TIME: DEV ? 0 : 4000,
};

/*
    Notes for devFlags:
    - PURGE_ALL_CHANNELS: purges Twilio channel data. Reload the app twice when toggling from false to true. You know it's successful if you reload the app and the CHAT/SET_ALL_USER_CHANNELS action sets an empty object
*/
export const devFlags = {
  keepMealOnView: DEV && false,
  purgeAllData: DEV && false,
};

export const defaultRefs = {
  emptyObj: {},
  nullfunc: () => {},
  emptyArr: [],
};

export const PLATFORM = Platform.OS === "ios" ? "ios" : "android";
export const IOS = PLATFORM === "ios";
export const DEV_FIRST_SCREEN = "DashboardNavigator";

console.table({
  "app name": { "": "DNA" },
  bundle: { "": appBundleIdentifier },
  version: { "": appVersionNumber },
  build: { "": appBuildVersion },
});

export const nullfunc = () => null;
