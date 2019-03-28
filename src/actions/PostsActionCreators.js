import axios from 'axios';
import ActionTypes from '../actions/ActionTypes';

export const selectSubreddit = subreddit => {
  return {
    type: ActionTypes.SELECT_SUBREDDIT,
    subreddit
  };
}

const requestPosts = subreddit => {
  return {
    type: ActionTypes.REQUEST_POSTS,
    subreddit
  };
}

const receivePosts = (subreddit, json) => {
  return {
    type: ActionTypes.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

const fetchPosts = subreddit => {
  return dispatch => {
    // First dispatch: the app state is updated to inform that the API call is starting.
    dispatch(requestPosts(subreddit))
    return axios.get(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => {
        // Here, we update the app state with the results of the API call.
        dispatch(receivePosts(subreddit, response.data))
        // throw new Error('NOT!');
      })
      .catch(error => {
        // error.message
      });
  };
}

const shouldFetchPosts = (state, subreddit) => {
  if (state.postsBySubreddit.isFetching)
    return false;
  else
    return true;
}

// Async Action Creators
// When an action creator returns a function, that function will get executed by the Redux Thunk middleware
export const fetchPostsIfNeeded = subreddit => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  // Note that the function also receives getState() with the current state
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}