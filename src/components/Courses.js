import React from 'react';
import PropTypes from 'prop-types';
import CourseItems from './CourseItems';

const Courses = (props) => {

    return(
      <div>
        <div className="hero-sm">
            <div className="row justify-content-center fullview-sm">
              <h1 className="font-primary align-self-center">Add Courses to the cart to buy them. More courses upcoming soon!</h1>
            </div>
        </div>
        <div className="container fullview">
            <CourseItems />
        </div>
      </div>
    );
}

Courses.propTypes = {

}

export default Courses;
