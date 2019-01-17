import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas/dist/html2canvas.js';
import jsPDF from 'jspdf/dist/jspdf.min.js';
import Logo from '../images/smalllogo.png';

const Test = (props) => {
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
    const addWaterMark = (doc,dataUrl) => {
      var totalPages = doc.internal.getNumberOfPages();

      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
        doc.setTextColor(150);
        doc.setFontSize(24);
        doc.text('GENESIS HEX DEVS',10, doc.internal.pageSize.height-5 );
        doc.setFontSize(12);
        doc.text('http://www.genesishexdevs.com',130, doc.internal.pageSize.height-10 );
        doc.addImage(dataUrl, "png", 180, 10, 20, 20, "image"+i, "NONE", 0);
      }

      return doc;
    }
    const printDocument = () => {
      const input = document.getElementById('divToPrint');
      let pdf = new jsPDF();
      pdf.fromHTML(input, 1, 1);
      toDataURL(Logo, function(dataUrl) {
        pdf = addWaterMark(pdf,dataUrl);
        pdf.save(props.match.params.path+".pdf");
      });
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
        <button onClick={printDocument} className="btn btn-primary btn-block">Download as PDF</button>
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
