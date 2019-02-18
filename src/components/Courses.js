import React from 'react';
import PropTypes from 'prop-types';
import CourseItems from './CourseItems';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Courses = (props) => {

    return(
      <div>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.match.path === '/courses' ? 'SlideIn' : 'SlideOut'}
        >
          <div className="hero-sm">
              <div className="row justify-content-center fullview-sm">
              </div>
          </div>
          <div className="container fullview">
              <h3 className="font-primary align-self-center">Add Courses to the cart to buy them. More courses upcoming soon!</h3>
              <CourseItems />
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

Courses.propTypes = {

}

export default Courses;
