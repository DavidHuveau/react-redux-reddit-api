import { combineReducers } from 'redux';
import ActionTypes from '../actions/ActionTypes';

const initialState = {
  isFetching: false,
  items: [],
  error: null
};

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case ActionTypes.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

const postsBySubreddit = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;