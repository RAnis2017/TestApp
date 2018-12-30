import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import UserCourses from './UserCourses';
import UserPerformance from './UserPerformance';
import UserSettings from './UserSettings';

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
                <a className="nav-link active" href="#" onClick={()=>props.changeTab("courses")}><i className="fas fa-book"></i> Courses</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("performance")}><i className="fas fa-chart-area"></i> Performance</a>
                <a className="nav-link" href="#" onClick={()=>props.changeTab("settings")}><i className="fas fa-cog"></i> Settings</a>
              </nav>
            </div>
            <div className="col-sm-12 col-lg-9">
              <div className="tab">
              {
                (props.currentTab == 1) ? <UserCourses /> : (props.currentTab == 2) ? <UserPerformance /> : <UserSettings />
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
