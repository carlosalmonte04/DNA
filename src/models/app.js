import { fetchAllMeals } from "@dnaActions";

export const AppInfo = (() => {
  let allUserMeals = [];

  return class AppInfo {
    constructor(attributes) {
      for (var key in attributes) {
        this[key] = attributes[key];
      }
    }
  };
})();
