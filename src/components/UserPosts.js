import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserPosts = (props) => {
    const { dispatch, loggedInUser, posts } = props;
    let ItemsJSX;
    ItemsJSX = posts.map((post,index)=>{

          return (
            <div className="col col-lg-12" key={index}>
              <div className="courseItem">
                <div className="row">
                  <div className="col col-lg-2">
                    <div className="courseImg text-center">
                      <h4>Admin</h4>
                    </div>
                  </div>
                  <div className="col col-lg-10">
                    <div className="courseName font-primary">
                      <h4>{post.title}</h4>
                      <h6>Date: {post.date}</h6>
                      <hr />
                      <h6>{post.description}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
    })
    return(
      <div className="tab-body">
        {ItemsJSX}
      </div>
    );
}

UserPosts.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    posts: state.posts,
  }
);

export default connect(mapStateToProps)(UserPosts);
