import { combineReducers } from 'redux';
import reducer from './reducer';

const appReducer = combineReducers({
  reducer
});

const LOGOUT_USER = 'AUTH/LOGOUT_USER';

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
