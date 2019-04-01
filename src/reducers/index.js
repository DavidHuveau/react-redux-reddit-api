import { combineReducers } from 'redux';
import postsBySubreddit from './postsBySubredditReducer';
import selectedSubreddit from './selectedSubredditReducer';

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;