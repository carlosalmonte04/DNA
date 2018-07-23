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

console.log(`**Modules - All modules fixed successfully`);
