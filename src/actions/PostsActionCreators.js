import axios from 'axios';
import ActionTypes from '../actions/ActionTypes';

const requestPosts = subreddit => {
  return {
    type: ActionTypes.RECEIVE_POSTS_REQUEST,
    subreddit
  };
}

const receivePosts = (subreddit, json) => {
  return {
    type: ActionTypes.RECEIVE_POSTS_SUCCESS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

const errorPosts = (subreddit, error) => {
  return {
    type: ActionTypes.RECEIVE_POSTS_FAILURE,
    subreddit,
    error
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
        dispatch(errorPosts(subreddit, error.message))
      });
  };
}

const shouldFetchPosts = (state) => {
  if (state.postsBySubreddit.isFetching)
    return false;
  else
    return true;
}

// Async Action Creators
// When an action creator returns a function, that function will get executed by the Redux Thunk middleware
const fetchPostsIfNeeded = subreddit => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  // Note that the function also receives getState() with the current state
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState()))
      return dispatch(fetchPosts(subreddit))
  };
}

export default fetchPostsIfNeeded;