import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AdminCourses = (props) => {
    const { dispatch, loggedInUser, newPost, postSaved, posts } = props;
    const adminPostSubmit = bindActionCreators(InterfaceActionCreators.adminPostSubmit, dispatch);
    const adminPostDelete = bindActionCreators(InterfaceActionCreators.adminPostDelete, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    let ItemsJSX = posts.map((post,key)=>{
      return (
        <div className="row" key={key}>
          <div className="col-sm-12 col-lg-12">
            <div className="courseItem">
              <div className="courseName font-primary">
                <h4>{post.title} | Date: {post.date}</h4>
                <hr />
                <h6>{post.description}</h6>
              </div>
              <button type="submit" className={`btn btn-block btn-danger`} onClick={(e)=>adminPostDelete(e,post.id)}>Delete</button>
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className="tab-body">
        <form className="">
          <div className="row">
            <div className="col-sm-12 col-lg-12">
              <div className="form-group">
                <label htmlFor="name">Post Title</label>
                <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Course Name" value={newPost.title} onChange={(e)=>keyPressedOnForm("post-title",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Post Description</label>
                <textarea className="form-control" id="description" aria-describedby="description" value={newPost.description} onChange={(e)=>keyPressedOnForm("post-description",e)}></textarea>
              </div>
            </div>
          </div>
          <button type="submit" className={`btn btn-block btn-success`} onClick={(e)=>adminPostSubmit(e)}>Post</button>
          {/*(postSaved) ? <h6 className="font-secondary text-center">Posted</h6> : ""*/}
          <hr />
          { ItemsJSX }
        </form>
      </div>
    );
}

AdminCourses.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  postSaved: PropTypes.bool.isRequired,
  newPost: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    postSaved: state.postSaved,
    newPost: state.newPost,
    posts: state.posts,
  }
);

export default connect(mapStateToProps)(AdminCourses);
