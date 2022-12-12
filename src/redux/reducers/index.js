import { combineReducers } from 'redux';
import user from './user';
import meals from './meals';
import drinks from './drinks';
import recipeInProgress from './recipeInProgress';

const rootReducer = combineReducers({
  user,
  meals,
  drinks,
  recipeInProgress,
});

export default rootReducer;
