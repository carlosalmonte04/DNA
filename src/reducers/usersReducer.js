import { User } from "@dnaModels";

const initialState = {
  user: new User()
};

function foodsReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return Object.assign({}, state, { user: action.payload });

    case "RESET_USER":
      return Object.assign({}, state, { user: new User() });

    default:
      return state;
  }
}

export default foodsReducer;
