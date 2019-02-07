import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';

const CourseItems = (props) => {
    const { dispatch, courses, addedToCart } = props;
    const addCartItem = bindActionCreators(InterfaceActionCreators.addCartItem, dispatch);
    let ItemsJSX;
    ItemsJSX = courses.map((course,index)=>{
          if(course != false){
            return (
              <div className="col-lg-3" key={index} >
                <div className="courseItem">
                  <div className="courseImg text-center">
                    <img src={course.imgSrc} className="img-fluid" />
                  </div>
                  <div className="courseName font-primary">
                    <h4>{course.name}</h4>
                    <h6>Tests: {course.testCount} | Duration: {course.duration} months</h6>
                  </div>
                  <div className="coursePriceCartAdd font-secondary text-center">
                    <h4>{course.price} {course.currency}</h4>
                    <hr/>
                    {
                      (course.availability == "released") ?
                      (addedToCart.includes(course.id)) ? <button type="button" className={`btn btn-success disabled`}>Added</button> : <button type="button" className={`btn btn-primary`} onClick={()=> addCartItem(course.id)}>Add to Cart</button>
                      :
                      <button type="button" className={`btn btn-primary`}>Coming Soon!</button>
                    }
                  </div>
                </div>
              </div>
            );
          }
    })
    return(
      <div className="row">
        {ItemsJSX}
      </div>
    );
}

CourseItems.propTypes = {
  courses: PropTypes.array.isRequired,
  addedToCart: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    courses: state.courses,
    addedToCart: state.addedToCart,
  }
);

export default connect(mapStateToProps)(CourseItems);
