import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';

const CourseItems = (props) => {
    const { dispatch, courses } = props;
    const addCartItem = bindActionCreators(InterfaceActionCreators.addCartItem, dispatch);
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
                  <h6>Questions: {course.mcqQuantity} Duration: {course.duration} hrs</h6>
                </div>
                <div className="coursePriceCartAdd font-secondary">
                  <h4>{course.price} {course.currency}</h4>
                  <hr/>
                  {
                    (course.availability == "released") ?
                    <button type="button" className={`btn btn-primary`} onClick={()=> addCartItem(course.id)}>Add to Cart</button>
                    :
                    <button type="button" className={`btn btn-primary`}>Coming Soon!</button>
                  }
                </div>
              </div>
            </div>
          );
    })
    return(
      <div className="row">
        {ItemsJSX}
      </div>
    );
}

CourseItems.propTypes = {
  courses: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    courses: state.courses,
  }
);

export default connect(mapStateToProps)(CourseItems);
