import * as T from "../actions/types";
import { User } from "@dnaModels";

const initialState = new User();

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.SET_USER:
      const { payload: { user } } = action;
      return { ...state, ...user };

    case T.RESET_USER:
      return initialState;

    case T.SET_USER_TOKEN:
      const { payload: { token } } = action;
      return {
        ...state,
        token
      };

    default:
      return state;
  }
};
