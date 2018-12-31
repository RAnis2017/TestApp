import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom';
import UserPerformance from './UserPerformance';

const UserDashboard = (props) => {

    return(
      <div className="tab-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="widget">
              <h4>Hello User!</h4>
              <hr />
              <p>I can't change the direction of the wind, but I can adjust my sails to always reach my destination.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <h4>Next Action</h4>
              <hr />
              <p>Pick up where you left of. This here will show your last test taken which is incomplete</p>
              <button type="button" className="btn btn-success">Continue Now</button>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget">
              <h4>Recently Bought Packages</h4>
              <hr />
              <p>List of all recently bought Packages</p>
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
                  <h6>57%</h6>
                  <p>ACCURATE</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <i className="fas fa-tachometer-alt heading-min"></i>
                </div>
                <div className="col-lg-10">
                  <h6>200 Mcqs</h6>
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
                  <h6>Raza Anis</h6><span><i className="fas fa-crosshairs"></i> 57% | <i className="fas fa-tachometer-alt"></i> 400</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-4">
                  3 . <i className="fas fa-user-circle heading-min"></i>
                </div>
                <div className="col-lg-8">
                  <h6>Raza Anis</h6><span><i className="fas fa-crosshairs"></i> 57% | <i className="fas fa-tachometer-alt"></i> 400</span>
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
}

const mapStateToProps = state => (
  {
  }
);

export default connect(mapStateToProps)(UserDashboard);
