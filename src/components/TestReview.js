import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'

const Test = (props) => {

    const { dispatch, loggedInUser} = props;

    const path = props.match.params.path;
    let currentQuestion;
    loggedInUser.courses.map((outerCourse,index) => {
      outerCourse.tests.map((course,index) => {


        if(course.path === path){
          currentQuestion = course.questions.map((question,key) => {
            return (
              <div key={key}>
                <h3  className="question">Q: {question.question}</h3>
                <hr />
                <h5>Answers (Correct Marked in Green):</h5>
                <h6 className={`${(question.selectedAnswer != question.truthyOption.replace(" ","") && question.selectedAnswer != 0) ? "wrong" : "not-visible"}`}>Wrong Answer</h6>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "1") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer1}</p>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "2") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer2}</p>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "3") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer3}</p>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "4") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer4}</p>
                <p className={``}>Explanation: {question.explanation}</p>
              </div>
            );
          });
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
          <hr />
          <Link className="btn btn-primary" to={`/dashboard`}>Go Back!</Link>
          <div className="row test-content">
            <div className="col-sm-12 col-lg-12">
              <div className="tab">
                <div className="ad"></div>

                {currentQuestion}
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
