import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import Timer from './Timer';
import Ad from './Ad';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from "axios";
import AdSense from 'react-adsense';

const Test = (props) => {

    const { dispatch, loggedInUser, selectedQuestion, apiUrl, markedForReview, ad, ad1, ad2} = props;
    const selectQuestion = bindActionCreators(InterfaceActionCreators.selectQuestion, dispatch);
    const selectAnswer = bindActionCreators(InterfaceActionCreators.selectAnswer, dispatch);
    const timeOver = bindActionCreators(InterfaceActionCreators.timeOver, dispatch);
    const nextPrevQuestion = bindActionCreators(InterfaceActionCreators.nextPrevQuestion, dispatch);
    const markForReview = bindActionCreators(InterfaceActionCreators.markForReview, dispatch);
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
          mcqQuantity = course.mcqQuantity;

          if(course.timeOver != true){
            currentCourse = course.id;

            sideNav = course.questions.map((question,key) => {
              return (
                <div className={`col-xs-1 col-sm-1 col-lg-2 grid-circle text-center ${(markedForReview.includes(question.id)) ? "marked" : ""} ${(question.selectedAnswer === 0) ? "unattempted" : "attempted"}`} key={key} onClick={(e)=>selectQuestion(e,question.id)}><p className="align-self-center">{question.id}</p></div>
              );
            });
            currentQuestion = course.questions.map((question,key) => {
              if(parseInt(question.id) === parseInt(selectedQuestion)){
                return (
                  <div key={key}>
                    <Timer timeOver={timeOver} path={path} loggedInUser={loggedInUser} testId={currentCourse}/>
                    <h3  className="question">Q {question.id}: <br /> {question.question} <a href="#" className="btn btn-info font-secondary" onClick={(e)=>markForReview(e,question.id)}>{(markedForReview.includes(question.id)) ? "Un-Mark" : "Mark for Review"}</a></h3>
                    <hr />
                    <h5>Select Correct Answer:</h5>
                    {/*<h6 className={`${(question.selectedAnswer != question.truthyOption && question.selectedAnswer != 0) ? "wrong" : "not-visible"}`}>Wrong Answer</h6>*/}
                    {/*<p className={`answer ${(question.selectedAnswer === question.truthyOption && question.truthyOption === "1") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "" : "disabled" }`} onClick={()=>selectAnswer(course.id,question.id,1)}>{question.answer1}</p>*/}
                    <p className={`answer ${(question.selectedAnswer === "1") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,1)}><span>A</span> {question.answer1}</p>
                    <p className={`answer ${(question.selectedAnswer === "2") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,2)}><span>B</span> {question.answer2}</p>
                    <p className={`answer ${(question.selectedAnswer === "3") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,3)}><span>C</span> {question.answer3}</p>
                    <p className={`answer ${(question.selectedAnswer === "4") ? "selected" : "" }`} onClick={()=>selectAnswer(course.id,question.id,4)}><span>D</span> {question.answer4}</p>
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
                                  <div className="col-lg-4">
                                   <i className="fas fa-times unattempted heading-min"></i> {parseInt(mcqQuantity)-(wrong+correct)} UNATTEMPTED
                                  </div>
                                  <div className="col-lg-4">
                                   <i className="fas fa-check unattempted heading-min"></i> {markedForReview.length} Marked for Review
                                  </div>
                                  <div className="col-lg-4">
                                    <i className="fas fa-crosshairs attempted heading-min"></i> {score} SCORE
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
          <div className="row">
            <div className="col-lg-12">
              <Ad ad={ad1}/>
            </div>
          </div>
          <div className="row test-content">
            <div className="col-xs-12 col-sm-12 col-lg-3">
              <div className="row grid">
                <div className="guide">
                  <h4>Different colors of Questions Represent their State as Follows:</h4>
                  <div className="row">
                    <div className="m-auto grid-circle-guide attempted">
                    </div>
                    <span>Attempted</span>
                    <div className="m-auto grid-circle-guide unattemptedBg">
                    </div>
                    <span>Unattempted</span>
                    <div className="m-auto grid-circle-guide marked">
                    </div>
                    <span>Marked for Review</span>
                  </div>
                </div>
                {sideNav}
              </div>
            </div>
            <div className="col-sm-12 col-lg-9">
              <div className="tab">

                <hr />
                <Ad ad={ad}/>
                {currentQuestion}
                <button type="button" className={"btn btn-success"+`${(parseInt(selectedQuestion) <= 1 && parseInt(selectedQuestion) > mcqQuantity) ? " disabled" : ""}`} onClick={(e)=>nextPrevQuestion("prev",e,null)}>Prev</button>
                <button type="button" className={"btn btn-success float-right"+`${(parseInt(selectedQuestion) === mcqQuantity+1) ? " disabled" : ""}`} onClick={(e)=>nextPrevQuestion("next",e,currentCourse)}>{(parseInt(selectedQuestion) === mcqQuantity) ? " Finish" : "Next"}</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Ad ad={ad1}/>
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
  markedForReview: PropTypes.array.isRequired,
  ad: PropTypes.object.isRequired,
  ad1: PropTypes.object.isRequired,
  ad2: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    selectedQuestion: state.selectedQuestion,
    apiUrl: state.apiUrl,
    markedForReview: state.markedForReview,
    ad: state.ad,
    ad1: state.ad1,
    ad2: state.ad2,
  }
);

export default connect(mapStateToProps)(Test);
