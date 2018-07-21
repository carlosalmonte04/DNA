const fs = require("fs.extra");

const errorHandler = err => {
  if (err) throw err;
};

const fsCopyOptions = {
  replace: true
};

console.log(
  `** MOVING MODULE FIXES FROM "./src/helpers/modulesFixes" to each respective module... SEE fixModules.js IF ANY ERRORS **`
);

const SWIPE_A_LOT_MODULE = "node_modules/react-native-swipe-a-lot/src/index.js";
const SWIPE_A_LOT_MODULE_FIX =
  "./src/moduleFixes/react-native-swipe-a-lot-fix.js";

const SWIPE_A_LOT_MODULE_FIXED_SIZE_VIEW =
  "node_modules/react-native-swipe-a-lot/src/FixedSizeView.js";
const SWIPE_A_LOT_MODULE_FIXED_SIZE_VIEW_FIX =
  "./src/moduleFixes/react-native-swipe-a-lot-FixedSizeView-fix.js";

const SWIPE_A_LOT_MODULE_CIRCLES =
  "node_modules/react-native-swipe-a-lot/src/Circles.js";
const SWIPE_A_LOT_MODULE_CIRCLES_FIX =
  "./src/moduleFixes/react-native-swipe-a-lot-Circles-fix.js";

fs.copy(
  SWIPE_A_LOT_MODULE_FIX,
  SWIPE_A_LOT_MODULE,
  fsCopyOptions,
  errorHandler
);

fs.copy(
  SWIPE_A_LOT_MODULE_FIXED_SIZE_VIEW_FIX,
  SWIPE_A_LOT_MODULE_FIXED_SIZE_VIEW,
  fsCopyOptions,
  errorHandler
);

fs.copy(
  SWIPE_A_LOT_MODULE_CIRCLES_FIX,
  SWIPE_A_LOT_MODULE_CIRCLES,
  fsCopyOptions,
  errorHandler
);

console.log(`**Modules - All modules fixed successfully`);
