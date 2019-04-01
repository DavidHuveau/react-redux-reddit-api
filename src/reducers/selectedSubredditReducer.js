import ActionTypes from '../actions/ActionTypes';

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case ActionTypes.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

export default selectedSubreddit;