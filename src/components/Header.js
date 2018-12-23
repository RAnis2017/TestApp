import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom'

const Header = (props) => {

    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            VinodKatrela
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
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
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search Courses" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          </div>
        </nav>

    );
}

Header.propTypes = {

}

export default Header;
