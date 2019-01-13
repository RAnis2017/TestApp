import React from 'react';
import PropTypes from 'prop-types';
import LoginSignUp from './LoginSignupForm';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Home = (props) => {

    return(
      <div className="hero-bg">
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.match.path === '/' ? 'SlideIn' : 'SlideOut'}
        >
          <div className="row justify-content-center fullview">
            <div className="col-lg-4 align-self-center text-center">
              <h1 className="heading-max font-secondary"><span className="font-accent">P</span>repare. <br /><span className="font-accent"> E</span>valuate.<br /><span className="font-accent"> S</span>ucceed!</h1>
              <Link className="btn btn-primary heading-min" to="/courses">
                Check Out Our Courses!
              </Link>
            </div>
            <div className="col-lg-4 align-self-center">
              <LoginSignUp />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

Home.propTypes = {

}

export default Home;
