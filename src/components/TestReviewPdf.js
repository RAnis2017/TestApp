import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
// import jsPDF from 'jspdf/dist/jspdf.min.js';
// import html2canvas from 'html2canvas';
// import rasterizeHTML from 'rasterizehtml';
import Logo from '../images/VedaIAS.png';

const Test = (props) => {
    const { dispatch, loggedInUser} = props;

    const path = props.match.params.path;
    let currentQuestion;
    let examTitle;
    let email = loggedInUser.email;
    let score;
    let totalScore;
    loggedInUser.courses.map((outerCourse,index) => {
      outerCourse.tests.map((course,index) => {


        if(course.path === path){
          examTitle = course.name;
          score = course.lastScore;
          totalScore = parseInt(course.mcqQuantity) * parseInt(course.marksPerQuestion);
          currentQuestion = course.questions.map((question,key) => {
            return (
              <div key={key}>
                <h6  className="question">Question #{question.id}</h6>
                <h4  className="question">Q: {question.question}</h4>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "1") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>A) {question.answer1}</p>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "2") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>B) {question.answer2}</p>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "3") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>C) {question.answer3}</p>
                <p className={`answer ${(question.truthyOption.replace(" ","") === "4") ? "correct disabled" : ""} ${(question.selectedAnswer === 0) ? "disabled" : "disabled" }`}>D) {question.answer4}</p>
                <span className={``}><b>Correct Answer:</b> {(question.truthyOption.replace(" ","") === "1") ? "A" : (question.truthyOption.replace(" ","") === "2") ? "B" : (question.truthyOption.replace(" ","") === "3") ? "C" : "D"}</span>
                <span className={``}> &nbsp;&nbsp; ||| &nbsp;&nbsp; <b>Your Answer:</b> {(question.selectedAnswer === "1") ? "A" : (question.selectedAnswer === "2") ? "B" : (question.selectedAnswer === "3") ? "C" : "D"}</span>
                <p className={``}><b>Explanation:</b> {question.explanation}</p>
              </div>
            );
          });
        }
      })
    });
    const toDataURL = (url, callback) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
    const addWaterMark = (doc,dataUrl,callback) => {
      var totalPages = doc.internal.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
        doc.setTextColor(147,147,147);
        doc.setFontSize(20);
        doc.text('Veda IAS',30, doc.internal.pageSize.height-18 );
        doc.setFontSize(12);
        doc.text('http://www.genesishexdevs.com',doc.internal.pageSize.width - 190, doc.internal.pageSize.height-40 );
        doc.text('Score',doc.internal.pageSize.width - 190, doc.internal.pageSize.height-28 );
        doc.text(`${score} / ${totalScore}`,doc.internal.pageSize.width - 190, doc.internal.pageSize.height-15 );
        doc.addImage(dataUrl, "png", 30, 20, 150, 37, "image"+i, "NONE", 0);
        doc.text('Exam Title: '+examTitle,doc.internal.pageSize.width - 150, 35 );
        doc.text('Email: '+email,doc.internal.pageSize.width - 150, 50 );
      }
      callback();
      // return doc;
    }
    const printDocument = () => {
      // const input = document.getElementById('divToPrint');
      let pdf = new window.jsPDF( 'p', 'pt', 'letter');
      let specialElementHandlers = {
      '#abc': function (element, renderer) {
            return true;
            }
        };
      let margins = {
        top: 40,
        bottom: 50,
        left: 40,
        width: 522
      };
      // pdf.addHTML(document.getElementById('divToPrint'), 10, 10, {pagesplit: true, margin: {top: 160, right: 60, bottom: 160, left: 60, useFor: 'content'} },
      //        function(dispose){
      //       toDataURL(Logo, function(dataUrl) {
      //         pdf = addWaterMark(pdf,dataUrl,()=>{pdf.save(props.match.params.path+".pdf");});
      //       });
      //

      pdf.fromHTML(
        document.getElementById('divToPrint'), // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, {
          // y coord
          width: margins.width // max width of content on PDF
        },
        function(dispose) {
          // dispose: object with X, Y of the last line add to the PDF
          //          this allow the insertion of new lines after html
          toDataURL(Logo, function(dataUrl) {
              pdf = addWaterMark(pdf,dataUrl,()=>{pdf.save(props.match.params.path+".pdf");});
          });
        },
        margins
      );
    }

    return(
      <div className="test-body">
        <div className="hero-sm-profile">
            <div className="row justify-content-center fullview-sm">
            </div>
        </div>
        <div className="container">
        <hr />
        <button onClick={printDocument} className="btn btn-primary btn-block">Download as PDF</button>
        <Link className="btn btn-primary btn-margin float-right" to={`/dashboard`}>Go Back!</Link>
          <div className="row test-content justify-content-center" >
            <div className="col-sm-10 col-lg-10" id="divToPrint" style={{background: "white"}}>
              <header><hr /></header>
              <div className="" >
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
