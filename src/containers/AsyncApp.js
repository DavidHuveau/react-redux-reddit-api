import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { fetchPostsIfNeeded } from '../actions/PostsActionCreators';
import { fetchPostsWithRSAA } from '../actions/PostsActionCreators';
import selectSubreddit from '../actions/SelectedSubredditActionCreators';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
  lastUpdated: PropTypes.number
};

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit } = state;
  return {
    selectedSubreddit,
    posts: postsBySubreddit.items,
    isFetching: postsBySubreddit.isFetching,
    lastUpdated: postsBySubreddit.lastUpdated
  };
}

const mapDispatchToProps = {
  // fetchPosts: fetchPostsIfNeeded,
  fetchPosts: fetchPostsWithRSAA,
  select: selectSubreddit
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp);