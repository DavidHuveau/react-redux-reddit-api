import ActionTypes from '../actions/ActionTypes';

const selectSubreddit = subreddit => {
  return {
    type: ActionTypes.SELECT_SUBREDDIT,
    subreddit
  };
}

export default selectSubreddit;
