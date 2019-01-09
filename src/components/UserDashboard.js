import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom';
import UserPerformance from './UserPerformance';

const UserDashboard = (props) => {
    const { dispatch, loggedInUser } = props;
    let recentPackages;
    if(loggedInUser.name.length > 1) {
      recentPackages = loggedInUser.recentPackages.map((recentPackage,key)=><li key={key}><Link className={``} to={`/courses/${recentPackage.path}`}>{recentPackage.name}</Link></li>);
    }
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
                  <h6>{loggedInUser.totalMcqs} Mcqs</h6>
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
              <div className="row">
                <div className="col-lg-4">
                  1 . <i className="fas fa-user-circle heading-min"></i>
                </div>
                <div className="col-lg-8">
                  <h6>Raza Anis</h6><span><i className="fas fa-crosshairs"></i> 57% | <i className="fas fa-tachometer-alt"></i> 400</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  2 . <i className="fas fa-user-circle heading-min"></i>
                </div>
                <div className="col-lg-8">
                  <h6>Danial Shakil</h6><span><i className="fas fa-crosshairs"></i> 47% | <i className="fas fa-tachometer-alt"></i> 230</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  3 . <i className="fas fa-user-circle heading-min"></i>
                </div>
                <div className="col-lg-8">
                  <h6>Usama Tariq</h6><span><i className="fas fa-crosshairs"></i> 77% | <i className="fas fa-tachometer-alt"></i> 300</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  4 . <i className="fas fa-user-circle heading-min"></i>
                </div>
                <div className="col-lg-8">
                  <h6>Raza Anis</h6><span><i className="fas fa-crosshairs"></i> 57% | <i className="fas fa-tachometer-alt"></i> 400</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  5 . <i className="fas fa-user-circle heading-min"></i>
                </div>
                <div className="col-lg-8">
                  <h6>Raza Anis</h6><span><i className="fas fa-crosshairs"></i> 57% | <i className="fas fa-tachometer-alt"></i> 400</span>
                </div>
              </div>
              <hr />
            </div>

          </div>
        </div>
      </div>
    );
}

UserDashboard.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(UserDashboard);
