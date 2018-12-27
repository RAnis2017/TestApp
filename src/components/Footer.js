import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom'

const Footer = (props) => {

    return(
      <div className="footer">
          <div className="row justify-content-center">
            <div className="col-lg-4 align-self-center text-center">
              <h1 className="heading-max font-secondary">VinodKatrela</h1>
            </div>
            <div className="col-lg-4 align-self-center">
              <ul>
                <li className="nav-item">
                  <NavLink
                          exact
                          to="/"
                          activeClassName="active"
                          className="nav-link"> Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                          exact
                          to="/about"
                          activeClassName="active"
                          className="nav-link"> About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                          exact
                          to="/contact"
                          activeClassName="active"
                          className="nav-link"> Contact Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                          exact
                          to="/privacypolicy"
                          activeClassName="active"
                          className="nav-link"> Privacy Policy
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                          exact
                          to="/"
                          activeClassName="active"
                          className="nav-link"> SignIn/SignUp
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
      </div>
    );
}

Footer.propTypes = {

}

export default Footer;
