import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas/dist/html2canvas.js';
import jsPDF from 'jspdf/dist/jspdf.min.js';

const Test = (props) => {
    const printDocument = () => {
      const input = document.getElementById('divToPrint');
      const pdf = new jsPDF();
      pdf.fromHTML(input, 1, 1);
      pdf.save(props.match.params.path+".pdf");
      // html2canvas(input)
      //   .then((canvas) => {
      //     const imgData = canvas.toDataURL('image/png', 1.0);
      //     if(canvas.width > canvas.height){
      //       const pdf = new jsPDF('l', 'mm', [canvas.width, canvas.height]);
      //       pdf.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      //       pdf.save(props.match.params.path+".pdf");
      //     }
      //     else{
      //       const pdf = new jsPDF('p', 'mm', [canvas.height, canvas.width]);
      //       pdf.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      //       pdf.save(props.match.params.path+".pdf");
      //     }
      //
      //   });
    }
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
                <h6>Correct Answer is: {question.truthyOption}</h6>
                <p className={`answer ${(question.truthyOption === "1") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer1}</p>
                <p className={`answer ${(question.truthyOption === "2") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer2}</p>
                <p className={`answer ${(question.truthyOption === "3") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer3}</p>
                <p className={`answer ${(question.truthyOption === "4") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>{question.answer4}</p>
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
        <button onClick={printDocument} className="btn btn-primary btn-block">Print</button>
          <div className="row test-content" >
            <div className="col-sm-12 col-lg-12" id="divToPrint">

              <div className="tab">
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
