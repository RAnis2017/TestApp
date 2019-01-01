import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'

const UserCourse = (props) => {
    const { dispatch, loggedInUser } = props;
    const courses = loggedInUser.courses;
    let ItemsJSX;
    ItemsJSX = courses.map((course,index)=>{

          return (
            <div className="col col-lg-3" key={index}>
              <div className="courseItem">
                <div className="courseImg text-center">
                  <img src={course.imgSrc} className="img-fluid" />
                </div>
                <div className="courseName font-primary">
                  <h4>{course.name}</h4>
                </div>
                <div className="coursePriceCartAdd font-secondary">
                  <h4>{course.price} {course.currency}</h4>
                  <hr/>
                  {
                    (course.availability == "released") ?
                    <a className="btn btn-primary" href="#" onClick={()=>props.changeTab("tests",course.path)}>Check Course!</a>
                    :
                    <button type="button" className={`btn btn-primary`}>Coming Soon!</button>
                  }
                </div>
              </div>
            </div>
          );
    })
    return(
      <div className="tab-body">
        {ItemsJSX}
      </div>
    );
}

UserCourse.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(UserCourse);
