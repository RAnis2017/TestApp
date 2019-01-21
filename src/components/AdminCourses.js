import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AdminCourses = (props) => {
    const { dispatch, loggedInUser, newCourse, newTest } = props;
    const adminCourseSubmit = bindActionCreators(InterfaceActionCreators.adminCourseSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    const convertFileToCSV = bindActionCreators(InterfaceActionCreators.convertFileToCSV, dispatch);
    return(
      <div className="tab-body">
        <form className="" >
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="name">Course Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Course Name" value={newCourse.name} onChange={(e)=>keyPressedOnForm("course-name",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Course Price</label>
                <input type="text" className="form-control" id="price" aria-describedby="price" placeholder="Enter Course Price" value={newCourse.price} onChange={(e)=>keyPressedOnForm("course-price",e)}/>
              </div>
              <div className="form-group">
                <input type="hidden" className="form-control" value={newCourse.currency} />
              </div>
              <div className="form-group">
                <label htmlFor="availability">Course Availability</label>
                <select className="form-control" id="availability" aria-describedby="availability" value={newCourse.availability} onChange={(e)=>keyPressedOnForm("course-availability",e)}>
                  <option value="released">Released</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="imgSrc">Course Img Link</label>
                <input type="text" className="form-control" id="imgSrc" aria-describedby="mcq" placeholder="Enter Course Img Link" value={newCourse.imgSrc} onChange={(e)=>keyPressedOnForm("course-imgSrc",e)}/>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="mcq">Course MCQs</label>
                <input type="text" className="form-control" id="mcq" aria-describedby="mcq" placeholder="Enter Course MCQs" value={newCourse.mcqQuantity} onChange={(e)=>keyPressedOnForm("course-mcqQuantity",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Course Duration (hours)</label>
                <input type="text" className="form-control" id="duration" aria-describedby="duration" placeholder="Enter Course Duration" value={newCourse.duration} onChange={(e)=>keyPressedOnForm("course-duration",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="path">Course Path (eg: sat-test-2019)</label>
                <input type="text" className="form-control" id="path" aria-describedby="mcq" placeholder="Enter Course Path" value={newCourse.path} onChange={(e)=>keyPressedOnForm("course-path",e)}/>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="name">Test Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Test Name" value={newTest.name} onChange={(e)=>keyPressedOnForm("test-name",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="availability">Test Availability</label>
                <select className="form-control" id="availability" aria-describedby="availability" value={newTest.availability} onChange={(e)=>keyPressedOnForm("test-availability",e)}>
                  <option value="released">Released</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="passing">Passing Percentage</label>
                <input type="text" className="form-control" id="passing" aria-describedby="passing" placeholder="Enter Test Passing" value={newTest.passRequirementPercentage} onChange={(e)=>keyPressedOnForm("test-passRequirementPercentage",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="questions">Test Questions CSV File</label>
                <input type="file" className="form-control" id="questions" aria-describedby="questions" placeholder="Enter Test Questions" onChange={(e)=>convertFileToCSV(e)}/>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="mcq">Test MCQs</label>
                <input type="text" className="form-control" id="mcq" aria-describedby="mcq" placeholder="Enter Test MCQs" value={newTest.mcqQuantity} onChange={(e)=>keyPressedOnForm("test-mcqQuantity",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Test Duration (hours)</label>
                <input type="text" className="form-control" id="duration" aria-describedby="duration" placeholder="Enter Test Duration" value={newTest.duration} onChange={(e)=>keyPressedOnForm("test-duration",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="path">Test Path (eg: sat-test-2019-1)</label>
                <input type="text" className="form-control" id="path" aria-describedby="mcq" placeholder="Enter Test Path" value={newTest.path} onChange={(e)=>keyPressedOnForm("test-path",e)}/>
              </div>

            </div>
          </div>
          <h6>Make Sure to Add Tests first before Saving Changes</h6>
          <button type="submit" className="btn btn-block btn-warning" >Add Test</button>
          <button type="submit" className="btn btn-block btn-success" onClick={(e)=>adminCourseSubmit(e)}>Save Changes</button>
        </form>
      </div>
    );
}

AdminCourses.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  newCourse: PropTypes.object.isRequired,
  newTest: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    newCourse: state.newCourse,
    newTest: state.newTest
  }
);

export default connect(mapStateToProps)(AdminCourses);
