import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export const selectSubreddit = subreddit => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

const requestPosts = subreddit => {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

const receivePosts = (subreddit, json) => {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

// Async Action Creators
// When an action creator returns a function, that function will get executed by the Redux Thunk middleware
const fetchPosts = subreddit => {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return dispatch => {
    // First dispatch: the app state is updated to inform that the API call is starting.
    dispatch(requestPosts(subreddit))
    return axios.get(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => {
        // Here, we update the app state with the results of the API call.
        dispatch(receivePosts(subreddit, response.data))
      });
  };
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
}

export const fetchPostsIfNeeded = subreddit => {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}