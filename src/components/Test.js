import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import Timer from './Timer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from "axios";

const Test = (props) => {

    const { dispatch, loggedInUser, selectedQuestion, apiUrl} = props;
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
    let correct;
    let wrong;
    let score;
    let oldCourses = [];

    loggedInUser.courses.map((outerCourse,index) => {
      outerCourse.tests.map((course,index) => {


        if(course.path === path){
          correct = course.lastCorrect;
          wrong = course.lastIncorrect;
          score = course.lastScore;
          if(course.timeOver != true){
            currentCourse = course.id;
            mcqQuantity = course.mcqQuantity;

            sideNav = course.questions.map((question,key) => {
              return (<a className={`nav-link`} href="#" key={key} onClick={(e)=>selectQuestion(e,question.id)}>{(question.selectedAnswer === 0) ? <i className="fas fa-question-circle unattempted" ></i> : <i className="fas fa-question-circle attempted" ></i> } {question.id} - {question.title}</a>);
            });
            currentQuestion = course.questions.map((question,key) => {
              if(question.id === selectedQuestion){
                return (
                  <div key={key}>
                    <Timer timeOver={timeOver} path={path} loggedInUser={loggedInUser} testId={currentCourse}/>
                    <h3  className="question">Q: {question.question}</h3>
                    <hr />
                    <h5>Select Correct Answer:</h5>
                    {/*<h6 className={`${(question.selectedAnswer != question.truthyOption && question.selectedAnswer != 0) ? "wrong" : "not-visible"}`}>Wrong Answer</h6>*/}
                    {/*<p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "1") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" }`} onClick={()=>selectAnswer(course.id,question.id,1)}>{question.answer1}</p>*/}
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "1") ? "disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" } ${(question.selectedAnswer === "1") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,1)}>{question.answer1}</p>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "2") ? "disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" } ${(question.selectedAnswer === "2") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,2)}>{question.answer2}</p>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "3") ? "disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" } ${(question.selectedAnswer === "3") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,3)}>{question.answer3}</p>
                    <p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "4") ? "disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" } ${(question.selectedAnswer === "4") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,4)}>{question.answer4}</p>
                  </div>
                );
              }
            });
          } else {
            currentQuestion = <div className="text-center">
                                <h3>Your Test is Over!</h3>
                                 <div className="row">
                                  <div className="col-lg-6">
                                    <i className="fas fa-check attempted heading-min"></i> {correct} CORRECT
                                  </div>
                                  <div className="col-lg-6">
                                    <i className="fas fa-times unattempted heading-min"></i> {wrong} INCORRECT
                                  </div>
                                 </div>
                                 <div className="row">
                                  <div className="col-lg-6">
                                    <i className="fas fa-crosshairs attempted heading-min"></i> {score}% SCORE
                                  </div>
                                 </div>
                                <Link className="btn btn-primary" to={`/testreview/${path}`}>Review Results</Link>
                                <Link className="btn btn-primary" to={`/testreviewpdf/${path}`}>Pdf Download</Link>
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

                {currentQuestion}
                <button type="button" className={"btn btn-success"+`${(selectedQuestion <= 1 && selectedQuestion > mcqQuantity) ? " disabled" : ""}`} onClick={(e)=>nextPrevQuestion("prev",e,null)}>Prev</button>
                <button type="button" className={"btn btn-success float-right"+`${(selectedQuestion === mcqQuantity+1) ? " disabled" : ""}`} onClick={(e)=>nextPrevQuestion("next",e,currentCourse)}>{(selectedQuestion === mcqQuantity) ? " Finish" : "Next"}</button>
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
  apiUrl: PropTypes.string.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    selectedQuestion: state.selectedQuestion,
    apiUrl: state.apiUrl,
  }
);

export default connect(mapStateToProps)(Test);
