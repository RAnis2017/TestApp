import React from 'react';
import PropTypes from 'prop-types';
import LoginSignUp from './LoginSignupForm';

const Home = (props) => {

    return(
      <div className="hero-bg">
          <div className="row justify-content-center fullview">
            <div className="col-lg-4 align-self-center text-center">
              <h1 className="heading-max"><span className="font-primary">P</span>repare. <br /><span className="font-primary"> E</span>valuate.<br /><span className="font-primary"> S</span>ucceed!</h1>
              <button type="button" className="btn btn-primary heading-min">Check Out Our Courses!</button>
            </div>
            <div className="col-lg-4 align-self-center">
              <LoginSignUp />
            </div>
          </div>
      </div>
    );
}

Home.propTypes = {

}

export default Home;
