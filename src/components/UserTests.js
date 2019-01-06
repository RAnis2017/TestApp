import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom';
import TestImg from '../images/test.png';
const UserTests = (props) => {
    const { dispatch, loggedInUser } = props;
    const path = props.path;
    let tests;
    loggedInUser.courses.map((course,index) => {
      if(course.path === path){
        tests = course.tests.map((test,key)=>{
          return (
            <div className="col col-lg-12" key={key}>
              <div className="courseItem">
                <div className="row">
                  <div className="col col-lg-2">
                    <div className="courseImg text-center">
                      <img src={TestImg} className="img-fluid" />
                    </div>
                  </div>
                  <div className="col col-lg-10">
                    <div className="courseName font-primary">
                      <h4>{test.name}</h4>
                      <hr />
                      <h6>Duration: {test.duration} hours| Mcqs: {test.mcqQuantity}</h6>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col col-lg-12">
                    <div className="courseDetails font-primary">
                      <h4> <i className="fas fa-percent font-accent"></i> Passing Percentage: {test.passRequirementPercentage}%</h4>
                      <h4> <i className="fas fa-calendar-day font-accent"></i> Last Date Taken: {test.lastTakenDate}</h4>
                      <h4> <i className="fas fa-sort-numeric-up font-accent"></i> Last Score: {test.lastScore}</h4>
                      <h4> <i className="fas fa-check font-accent"></i> Last Correct: {test.lastCorrect}</h4>
                      <h4> <i className="fas fa-times font-accent"></i> Last Incorrect: {test.lastIncorrect}</h4>
                      <hr />
                    </div>
                    <div className="coursePriceCartAdd font-secondary">
                      <hr/>
                      {(test.availability === "released") ? <Link className={`btn btn-primary`} to={`/courses/${test.path}`}>Take Test!</Link> : <Link className={`btn btn-primary disabled`} to={`/courses/${test.path}`}>Upcoming</Link>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    })

    return(
      <div className="tab-body">
        {tests}
      </div>
    );
}

UserTests.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(UserTests);
