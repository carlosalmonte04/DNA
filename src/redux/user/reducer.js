import { User } from 'models/user';
import { Types } from './types';

const initialState = new User();

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER:
      const {
        payload: { user },
      } = action;
      return { ...state, ...user };

    case Types.RESET_USER:
      return initialState;

    case Types.SET_USER_TOKEN:
      const {
        payload: { token },
      } = action;
      return {
        ...state,
        token,
      };

    default:
      return state;
  }
};
