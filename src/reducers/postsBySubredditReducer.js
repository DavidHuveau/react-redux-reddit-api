import ActionTypes from '../actions/ActionTypes';

const initialState = {
  isFetching: false,
  items: [],
  error: null
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
        // items: action.posts,
        items: action.payload.data.children.map(child => child.data),
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

export default postsBySubreddit;