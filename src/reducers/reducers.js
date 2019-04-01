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
    case ActionTypes.RECEIVE_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case ActionTypes.RECEIVE_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
        error: null
      };
    case ActionTypes.RECEIVE_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.error
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