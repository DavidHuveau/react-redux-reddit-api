import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions/PostsActionCreators';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { fetchPosts, selectedSubreddit} = this.props;
    fetchPosts(selectedSubreddit);
  }

  // componentDidUpdate(prevProps) {
  //   debugger
  //   if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
  //     const { dispatch, selectedSubreddit } = this.props;
  //     dispatch(fetchPostsIfNeeded(selectedSubreddit));
  //   }
  // }

  handleChange(nextSubreddit) {
    const { select, fetchPosts } = this.props;
    select(nextSubreddit);
    fetchPosts(nextSubreddit);
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { invalid, fetchPosts, selectedSubreddit } = this.props;
    invalid(selectedSubreddit);
    fetchPosts(selectedSubreddit);
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend', 'vuejs']}
        />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>}
          {!isFetching &&
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>}
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  debugger
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
      isFetching: true,
      items: []
    };
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: selectedSubreddit => {
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    },
    select: selectedSubreddit => {
      dispatch(selectSubreddit(selectedSubreddit));
    },
    invalid: selectedSubreddit => {
      dispatch(invalidateSubreddit(selectedSubreddit));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp);