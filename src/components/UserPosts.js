import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserPosts = (props) => {
    const { dispatch, loggedInUser } = props;
    const posts = loggedInUser.posts;
    let ItemsJSX;
    ItemsJSX = posts.map((post,index)=>{

          return (
            <div className="col col-lg-12" key={index}>
              <div className="courseItem">
                <div className="row">
                  <div className="col col-lg-2">
                    <div className="courseImg text-center">
                      <img src={post.userpic} className="img-fluid" />
                      <h4>{post.poster}</h4>
                    </div>
                  </div>
                  <div className="col col-lg-10">
                    <div className="courseName font-primary">
                      <h4>{post.title} | Date: {post.dated}</h4>
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
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(UserPosts);
