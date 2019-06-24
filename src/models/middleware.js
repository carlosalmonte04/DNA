import { Meal } from './meal';

export default store => {
  Meal.connectDispatch(store.dispatch);
  return next => action => {
    next(action);
  };
};
