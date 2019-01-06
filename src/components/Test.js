import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import Timer from './Timer';

const Test = (props) => {

    const { dispatch, loggedInUser, selectedQuestion} = props;
    const selectQuestion = bindActionCreators(InterfaceActionCreators.selectQuestion, dispatch);
    const selectAnswer = bindActionCreators(InterfaceActionCreators.selectAnswer, dispatch);
    const timeOver = bindActionCreators(InterfaceActionCreators.timeOver, dispatch);
    const nextPrevQuestion = bindActionCreators(InterfaceActionCreators.nextPrevQuestion, dispatch);
    const path = props.match.params.path;
    let ogTime;
    let sideNav;
    let currentQuestion;
    let currentCourse;
    let mcqQuantity;
    loggedInUser.courses.map((outerCourse,index) => {
      outerCourse.tests.map((course,index) => {
        if(course.path === path){
          if(course.timeOver != true){
            currentCourse = course.id;
            mcqQuantity = course.mcqQuantity;
            sideNav = course.questions.map((question,key) => {
              return (<a className={`nav-link`} href="#" key={key} onClick={(e)=>selectQuestion(e,question.id)}>{(question.selectedAnswer === 0) ? <i className="fas fa-question-circle unattempted" ></i> : <i className="fas fa-question-circle attempted" ></i> } {question.id} - {question.title}</a>);
            });
            currentQuestion = course.questions.map((question,key) => {
              ogTime = course.duration;
              if(question.id === selectedQuestion){
                return (
                  <div key={key}>
                    <h3  className="question">Q: {question.question}</h3>
                    <hr />
                    <h5>Select Correct Answer:</h5>
                    <h6 className={`${(question.selectedAnswer != question.truthyOption && question.selectedAnswer != 0) ? "wrong" : "not-visible"}`}>Wrong Answer</h6>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "1") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" }`} onClick={()=>selectAnswer(course.id,question.id,1)}>{question.answer1}</p>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "2") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" }`} onClick={()=>selectAnswer(course.id,question.id,2)}>{question.answer2}</p>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "3") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" }`} onClick={()=>selectAnswer(course.id,question.id,3)}>{question.answer3}</p>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "4") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" }`} onClick={()=>selectAnswer(course.id,question.id,4)}>{question.answer4}</p>
                  </div>
                );
              }
            });
          } else {
            currentQuestion = <div className="text-center">
                                <h3>Your Time is Over!</h3>
                                 <div className="row">
                                  <div className="col-lg-6">
                                    <i className="fas fa-check attempted heading-min"></i> 1 CORRECT
                                  </div>
                                  <div className="col-lg-6">
                                    <i className="fas fa-times unattempted heading-min"></i> 4 INCORRECT
                                  </div>
                                 </div>
                                 <div className="row">
                                  <div className="col-lg-6">
                                    <i className="fas fa-crosshairs attempted heading-min"></i> 10% ACCURATE
                                  </div>
                                  <div className="col-lg-6">
                                    <i className="fas fa-tachometer-alt attempted heading-min"></i> 1.00 SCORE
                                  </div>
                                 </div>
                                <Link className="btn btn-primary" to="/profile">Review Results</Link>
                              </div>;
          }
        }
      })
    });
    return(
      <div className="test-body">
        <div className="hero-sm-profile">
            <div className="row justify-content-center fullview-sm">
            </div>
        </div>
        <div className="container fullview">
          <div className="row test-content">
            <div className="col-sm-12 col-lg-3">
              <nav className="nav">
                {sideNav}
              </nav>
            </div>
            <div className="col-sm-12 col-lg-9">
              <div className="tab">
                <div className="ad"></div>
                <Timer ogTime={ogTime} timeOver={timeOver} courseId={currentCourse}/>
                {currentQuestion}
                <button type="button" className={"btn btn-success"+`${(selectedQuestion <= 1) ? " disabled" : ""}`} onClick={(e)=>nextPrevQuestion("prev",e)}>Prev</button>
                <button type="button" className={"btn btn-success float-right"+`${(selectedQuestion === mcqQuantity) ? " disabled" : ""}`} onClick={(e)=>nextPrevQuestion("next",e)}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

Test.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  selectedQuestion: PropTypes.number.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    selectedQuestion: state.selectedQuestion,
  }
);

export default connect(mapStateToProps)(Test);
