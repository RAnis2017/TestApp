import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { NavLink, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

const Header = (props) => {
    const { dispatch, cartToggle, loggedInUser, courses } = props;
    const showCart = bindActionCreators(InterfaceActionCreators.showCart, dispatch);
    let itemsCount = 0;
    courses.map((course,index)=>{
        if(course.inCart){
          itemsCount++;
        }
    });
    return(
        <div>
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
                        to="/courses"
                        activeClassName="active"
                        className="nav-link"> Store
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
              {(loggedInUser.name.length < 1) ?
                <li className="nav-item">
                  <NavLink
                          exact
                          to="/"
                          activeClassName="active"
                          className="nav-link"> SignIn/SignUp
                  </NavLink>
                </li>
                :
                  <li className="nav-item">
                    <NavLink
                            exact
                            to="/profile"
                            activeClassName="active"
                            className="nav-link"> Profile
                    </NavLink>
                  </li>
              }
              {(loggedInUser.name.length < 1) ?
              ""
              :
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={()=>props.signOut(()=>props.history.push('/'))}><i className="fas fa-sign-out-alt"></i> Sign Out</a>
              </li>
              }
              <li className="nav-item">
                <NavLink
                        exact
                        to="/cart"
                        activeClassName="active"
                        className="">
                        <button type="button" className="btn"><i className={`fas fa-shopping-cart ${(itemsCount > 0) ? "cartFilled": ""}`}></i></button>
                        <span className="cartAmount">{itemsCount}</span>
                </NavLink>
              </li>
            </ul>
            </div>
          </nav>
        </div>
    );
}

Header.propTypes = {
  cartToggle: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    cartToggle: state.cartToggle,
    loggedInUser: state.loggedInUser,
    courses: state.courses,
  }
);

export default connect(mapStateToProps)(Header);
