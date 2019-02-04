import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import Gif from '../images/404.gif';

const NotFound = (props) => {

    return(
      <div>
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.match.path === '/404' ? 'SlideIn' : 'SlideOut'}
        >
            <div className="hero-bg-404">
              <div className="row justify-content-center">
                <Link to="/">
                  <img src={Gif} className="img-fluid align-self-center" />
                </Link>
              </div>
            </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

NotFound.propTypes = {

}

export default NotFound;
