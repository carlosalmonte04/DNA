import { foodsReducer } from "./foodsReducer";
import { mealsReducer } from "./mealsReducer";
import { uiReducer } from "./uiReducer";
import { userReducer } from "./userReducer";
import { navReducer } from "./navReducer";

export * from "./selectors";
export const Reducers = {
  foods: foodsReducer,
  meals: mealsReducer,
  ui: uiReducer,
  user: userReducer,
  nav: navReducer
};
