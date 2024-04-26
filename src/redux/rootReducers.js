import { combineReducers } from 'redux';
import userData from './slices/userData';


const rootReducer = combineReducers({
  userSlice: userData,
});

export { rootReducer };
