import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const AdminEditCourses = (props) => {
    const { dispatch, loggedInUser, newCourse, newTest, courseSaved, isTestUpdating } = props;
    const adminUpdateCourseSubmit = bindActionCreators(InterfaceActionCreators.adminUpdateCourseSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    const convertFileToCSV = bindActionCreators(InterfaceActionCreators.convertFileToCSV, dispatch);
    const addTest = bindActionCreators(InterfaceActionCreators.addTest, dispatch);
    const adminCourseSelect = bindActionCreators(InterfaceActionCreators.adminCourseSelect, dispatch);
    const adminTestSelect = bindActionCreators(InterfaceActionCreators.adminTestSelect, dispatch);
    const adminDeleteCourseSubmit = bindActionCreators(InterfaceActionCreators.adminDeleteCourseSubmit, dispatch);
    let submit = (e,id) => {
        e.preventDefault();
        confirmAlert({
          title: 'Confirm to Delete',
          message: 'Are you sure to delete this course?',
          buttons: [
            {
              label: 'Delete',
              onClick: () => adminDeleteCourseSubmit(e,id)
            },
            {
              label: 'Cancel',
              onClick: () => console.log('Click No')
            }
          ]
        })
    };
    let coursesEdit = loggedInUser.courses.map((course, key)=>{
      return(<div className="col-sm-4 col-lg-2" key={key}><button type="submit" className={`btn btn-block btn-info`} onClick={(e)=>adminCourseSelect(e,course.id)}>{course.name}</button></div>);
    });
    let testsEdit = newCourse.tests.map((test,key)=>{
      return(<div className="col-sm-4 col-lg-2" key={key}><button type="submit" className={`btn btn-block btn-info`} onClick={(e)=>adminTestSelect(e,test.id)}>{test.name}</button></div>);
    });
    return(
      <div className="tab-body">
        <form className="" >
          <div className="row">
            { coursesEdit }
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="name">Course Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Course Name" defaultValue={newCourse.name} onChange={(e)=>keyPressedOnForm("course-name",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="price">Course Price</label>
                <input type="text" className="form-control" id="price" aria-describedby="price" placeholder="Enter Course Price" defaultValue={newCourse.price} onChange={(e)=>keyPressedOnForm("course-price",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="currency">Course Currency</label>
                <input type="text" className="form-control" id="currency" aria-describedby="currency" placeholder="Enter Course Currency" defaultValue={newCourse.currency} onChange={(e)=>keyPressedOnForm("course-currency",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="availability">Course Availability</label>
                <select className="form-control" id="availability" aria-describedby="availability" defaultValue={newCourse.availability} onChange={(e)=>keyPressedOnForm("course-availability",e)}>
                  <option value="">Select a option</option>
                  <option value="released" >Released</option>
                  <option value="upcoming" >Upcoming</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="imgSrc">Course Img Link</label>
                <input type="text" className="form-control" id="imgSrc" aria-describedby="mcq" placeholder="Enter Course Img Link" defaultValue={newCourse.imgSrc} onChange={(e)=>keyPressedOnForm("course-imgSrc",e)}/>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="mcq">Course MCQs</label>
                <input type="text" className="form-control" id="mcq" aria-describedby="mcq" placeholder="Enter Course MCQs" defaultValue={newCourse.mcqQuantity} onChange={(e)=>keyPressedOnForm("course-mcqQuantity",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Course Duration (hours)</label>
                <input type="text" className="form-control" id="duration" aria-describedby="duration" placeholder="Enter Course Duration" defaultValue={newCourse.duration} onChange={(e)=>keyPressedOnForm("course-duration",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="path">Course Path (eg: sat-test-2019)</label>
                <input type="text" className="form-control" id="path" aria-describedby="mcq" placeholder="Enter Course Path" defaultValue={newCourse.path} onChange={(e)=>keyPressedOnForm("course-path",e)}/>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            { testsEdit }
            <div className="col-sm-4 col-lg-2"><button type="submit" className={`btn btn-block btn-info`} onClick={(e)=>adminTestSelect(e,"NEWTEST")}>New Test</button></div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="name">Test Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter Test Name" defaultValue={newTest.name} onChange={(e)=>keyPressedOnForm("test-name",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="availability">Test Availability</label>
                <select className="form-control" id="availability" aria-describedby="availability" defaultValue={newTest.availability} onChange={(e)=>keyPressedOnForm("test-availability",e)}>
                  <option value="">Select an option</option>
                  <option value="released" >Released</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="passing">Passing Percentage</label>
                <input type="text" className="form-control" id="passing" aria-describedby="passing" placeholder="Enter Test Passing" defaultValue={newTest.passRequirementPercentage} onChange={(e)=>keyPressedOnForm("test-passRequirementPercentage",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="questions">Test Questions CSV File</label>
                <input type="file" className="form-control" id="questions" aria-describedby="questions" placeholder="Enter Test Questions" onChange={(e)=>convertFileToCSV(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="marks">Total Marks Per Question</label>
                <input type="number" className="form-control" id="marks" aria-describedby="marks" placeholder="Enter Test Total Marks" defaultValue={newTest.marksPerQuestion} onChange={(e)=>keyPressedOnForm("test-marksPerQuestion",e)}/>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="form-group">
                <label htmlFor="mcq">Test MCQs</label>
                <input type="text" className="form-control" id="mcq" aria-describedby="mcq" placeholder="Enter Test MCQs" defaultValue={newTest.mcqQuantity} onChange={(e)=>keyPressedOnForm("test-mcqQuantity",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Test Duration (hours)</label>
                <input type="text" className="form-control" id="duration" aria-describedby="duration" placeholder="Enter Test Duration" defaultValue={newTest.duration} onChange={(e)=>keyPressedOnForm("test-duration",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="path">Test Path (eg: sat-test-2019-1)</label>
                <input type="text" className="form-control" id="path" aria-describedby="mcq" placeholder="Enter Test Path" defaultValue={newTest.path} onChange={(e)=>keyPressedOnForm("test-path",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="Pdf">Pdf Availability</label>
                <select className="form-control" id="pdf" aria-describedby="pdf" defaultValue={newTest.pdf} onChange={(e)=>keyPressedOnForm("test-pdf",e)}>
                  <option value="">Select an option</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="negmarks">Negative marks in Decimal Points (eg: 0.33)</label>
                <input type="number" step="0.01" min="0" className="form-control" id="negmarks" aria-describedby="negmarks" placeholder="Negative Marking" defaultValue={newTest.negMarking} onChange={(e)=>keyPressedOnForm("test-negMarking",e)}/>
              </div>
            </div>
          </div>
          <h6>Make Sure to Add Tests first before Saving Changes</h6>
          <button type="submit" className={`btn btn-block btn-warning ${(newTest.questions.length > 0) ? "" : "disabled"}`} onClick={(e)=>addTest(e)}>{(isTestUpdating) ? "Update" : "Add"} Test</button>
          <button type="submit" className={`btn btn-block btn-success`} onClick={(e)=>adminUpdateCourseSubmit(e)}>Update Changes</button>
          <button type="submit" className={`btn btn-block btn-danger`} onClick={(e)=>submit(e,newCourse.id)}>Delete</button>
          {(courseSaved) ? <h6 className="font-accent text-center">Changes have been saved.</h6> : ""}
        </form>
      </div>
    );
}

AdminEditCourses.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  newCourse: PropTypes.object.isRequired,
  newTest: PropTypes.object.isRequired,
  courseSaved: PropTypes.bool.isRequired,
  isTestUpdating: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    newCourse: state.newCourse,
    newTest: state.newTest,
    courseSaved: state.courseSaved,
    isTestUpdating: state.isTestUpdating,
  }
);

export default connect(mapStateToProps)(AdminEditCourses);
