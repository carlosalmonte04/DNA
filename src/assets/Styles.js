import {
  Dimensions,
  StyleSheet,
  StatusBarManager,
  Platform
} from "react-native";
import { IOS } from "@dnaConfig";

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;

export const IOSX = HEIGHT === 812 && IOS;

const _getStatusBarHeight = () => {
  if (IOS) {
    return IOSX ? 44 : 20;
  }

  return StatusBarManager.HEIGHT;
};
export const DEFAULT_STATUS_BAR_HEIGHT = _getStatusBarHeight();
export const DEFAULT_HEADER_HEIGHT = 65;

export const HEADER_AND_STATUS_BAR_HEIGHT =
  DEFAULT_HEADER_HEIGHT + DEFAULT_STATUS_BAR_HEIGHT;

export const DEFAULT_TABBAR_HEIGHT = IOSX ? 70 : 50;

export const VIEWABLE_CONTENT_HEIGHT =
  HEIGHT - DEFAULT_HEADER_HEIGHT - DEFAULT_STATUS_BAR_HEIGHT;

export const Styles = StyleSheet.create({
  flexNull: {
    flex: null
  },
  fullScreen: {
    height: HEIGHT,
    width: WIDTH
  },
  fullWidth: {
    width: WIDTH
  }
});
