import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import AdminCourses from './AdminCourses';
import AdminPosts from './AdminPosts';
import UserSettings from './UserSettings';
import AdminCoupons from './AdminCoupons';
import AdminEditCourses from './AdminEditCourses';
import AdSettings from './AdSettings';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Admin = (props) => {
    const { dispatch, loggedInUser } = props;

    if(loggedInUser.admin !== true){
      props.history.push('/');
    }
    return(
      <div className="profile-body">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={props.match.path === '/admin' ? 'SlideIn' : 'SlideOut'}
      >
        <div className="hero-sm-profile">
            <div className="row justify-content-center fullview-sm">
            </div>
        </div>
        <div className="container fullview">
          <div className="row profile-content">
            <div className="col-sm-12 col-lg-3">
              <nav className="nav flex-column">
                <a className="nav-link active" href="#" onClick={()=>props.changeTab("add-courses")}><i className="fas fa-book"></i> Add Courses</a>
                <a className="nav-link active" href="#" onClick={()=>props.changeTab("edit-courses")}><i className="fas fa-book"></i> Edit Courses</a>
                <a className="nav-link active" href="#" onClick={()=>props.changeTab("add-posts")}><i className="fas fa-book"></i> Add Posts</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("add-coupons")}><i className="fas fa-book"></i> Add Coupons</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("settings")}><i className="fas fa-cog"></i> Settings</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("ad-settings")}><i className="fas fa-cog"></i> Ad Settings</a>
                <a className="nav-link" href="#" onClick={()=>props.theme()}><i className="fas fa-brush"></i> Change Theme to {props.currentTheme === "Light" ? "Night" : "Light"}</a>
                <a className="nav-link" href="#" onClick={()=>props.signOut(()=>props.history.push('/'))}><i className="fas fa-sign-out-alt"></i> Sign Out</a>
              </nav>
            </div>
            <div className="col-sm-12 col-lg-9">
              <div className="tab">
              {
                (props.currentTab == 1) ? <AdminCourses /> : (props.currentTab == 2) ? <AdminEditCourses /> : (props.currentTab == 3) ? <AdminPosts /> : (props.currentTab == 4) ? <AdminCoupons /> : (props.currentTab == 5) ? <UserSettings /> : <AdSettings />
              }
              </div>
            </div>
          </div>
        </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

Admin.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(Admin);
