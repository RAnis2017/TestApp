import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom';
import UserPerformance from './UserPerformance';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const UserDashboard = (props) => {
    const { dispatch, loggedInUser, users } = props;
    let recentPackages;
    let totalCorrectMcqs = 0;
    if(loggedInUser.name.length > 1) {
      recentPackages = loggedInUser.recentPackages.map((recentPackage,key)=><li key={key}><Link className={``} to={`/courses/${recentPackage.path}`}>{recentPackage.name}</Link></li>);
      loggedInUser.courses.map((outerCourse)=>{
        outerCourse.tests.map((course)=>{
          totalCorrectMcqs += course.firstTimeCorrect;
        });
        return outerCourse;
      });
    }
    let usersSorted = users.sort(function(obj1, obj2) {
            	// Ascending: first age less than the previous
            	return obj2.accuracy - obj1.accuracy;
            });
    console.log(usersSorted);
    let usersList = usersSorted.map((user,key)=>{
      if(key < 5){
        return(
          <div className="row" key={key}>
            <div className="col-lg-4">
              {key} . <i className="fas fa-user-circle heading-min"></i>
            </div>
            <div className="col-lg-8">
              <h6>{user.name}</h6><span><i className="fas fa-crosshairs"></i> {user.accuracy}% | <i className="fas fa-tachometer-alt"></i> {(user.email === loggedInUser.email) ? totalCorrectMcqs : user.totalMcqs}</span>
            </div>
            <hr />
          </div>
        );
      }
    });
    return(
      <div className="tab-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="widget">
              <h4>Hello {loggedInUser.name}!</h4>
              <hr />
              <p>I can't change the direction of the wind, but I can adjust my sails to always reach my destination.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <h4>Next Action</h4>
              <hr />
              <p>Pick up where you left of. This here will show your last test taken which is incomplete</p>
              <Link className={`btn btn-success`} to={`/courses/${loggedInUser.nextPath}`}>Take Test!</Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <h4>Recently Bought Packages</h4>
              <hr />
              <p>List of all recently bought Packages</p>
              <ul>
              {
                recentPackages
              }
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-3">
            <div className="widget">
              <h4>Stats</h4>
              <hr />
              <div className="row">
                <div className="col-lg-3">
                  <i className="fas fa-crosshairs heading-min"></i>
                </div>
                <div className="col-lg-9">
                  <h6>{loggedInUser.accuracy}%</h6>
                  <p>ACCURATE</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <i className="fas fa-tachometer-alt heading-min"></i>
                </div>
                <div className="col-lg-10">
                  <h6>{totalCorrectMcqs} Mcqs</h6>
                  <p>ATTEMPTED</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="widget">
              <h4>Performance Overview</h4>
              <hr />
              <UserPerformance height="300"/>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <h4>Leader Board</h4>
              <hr />
              {usersList}
            </div>

          </div>
        </div>
      </div>
    );
}

UserDashboard.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    users: state.users,
  }
);

export default connect(mapStateToProps)(UserDashboard);
