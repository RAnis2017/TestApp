import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import UserDashboard from './UserDashboard';
import UserCourses from './UserCourses';
import UserPerformance from './UserPerformance';
import UserSettings from './UserSettings';
import UserTests from './UserTests';
import UserPosts from './UserPosts';

const Profile = (props) => {


    return(
      <div className="profile-body">
        <div className="hero-sm-profile">
            <div className="row justify-content-center fullview-sm">
            </div>
        </div>
        <div className="container fullview">
          <div className="row profile-content">
            <div className="col-sm-12 col-lg-3">
              <nav className="nav flex-column">
                <a className="nav-link active" href="#" onClick={()=>props.changeTab("dashboard")}><i className="fas fa-book"></i> Dashboard</a>
                <a className="nav-link active" href="#" onClick={()=>props.changeTab("courses")}><i className="fas fa-book"></i> Tests</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("performance")}><i className="fas fa-chart-area"></i> Performance</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("posts")}><i className="fas fa-paste"></i> Posts</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("settings")}><i className="fas fa-cog"></i> Settings</a>
                <a className="nav-link" href="#" onClick={()=>props.theme()}><i className="fas fa-brush"></i> Change Theme to {props.currentTheme === "Light" ? "Night" : "Light"}</a>
              </nav>
            </div>
            <div className="col-sm-12 col-lg-9">
              <div className="tab">
              {
                (props.currentTab == 1) ? <UserCourses changeTab={props.changeTab} /> : (props.currentTab == 2) ? <UserPerformance height="600"/> : (props.currentTab == 3) ? <UserSettings /> : (props.currentTab == 4) ? <UserDashboard/> : (props.currentTab == 5) ? <UserTests path={props.path}/> : <UserPosts />
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

Profile.propTypes = {

}

export default Profile;
