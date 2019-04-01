import { combineReducers } from 'redux';
import postsBySubreddit from './postsBySubreddit.reducer';
import selectedSubreddit from './selectedSubreddit.reducer';


const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;