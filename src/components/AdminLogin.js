import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import Loading from './Loading';

const Form = (props) => {
    const { dispatch, selectedForm, email, password, name, signupDone, forgotPassDone, loggedInUser, loggedIn, loadingLogIn } = props;
    const changeForm = bindActionCreators(InterfaceActionCreators.changeForm, dispatch);
    const formSubmit = bindActionCreators(InterfaceActionCreators.formSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    let formJSX;
    if(selectedForm === "LOGIN"){
      formJSX = <form className="loginFormDiv" onSubmit={(e)=>{formSubmit(e,"login",(routeToGo)=>{props.history.push('/'+routeToGo)}); }}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" value={email} placeholder="Enter email" onChange={(e)=>keyPressedOnForm("email",e)}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>keyPressedOnForm("password",e)}/>
                  </div>
                    {
                      (loadingLogIn) ?
                      <Loading type={"spinningBubbles"} color={"#ffffff"} />
                      :
                      <button type="submit" className="btn btn-block btn-primary" >Log In</button>
                    }
                    <a href="#" className="font-primary float-right" onClick={()=>changeForm("forgotpass")}>Forgot Password?</a>
                </form>;
    } else {
      formJSX = <form className="loginFormDiv" onSubmit={(e)=>formSubmit(e,"forgotpass")}>
                  {(!forgotPassDone) ?
                  <div>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" value={email} onChange={(e)=>keyPressedOnForm("email",e)}/>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">Send Recovery Email</button>
                  </div>
                : <h4 className="text-center">If Email is present on our Website we will send you an Email with reset link.</h4>}
              </form>;
    }
    return(
          <div>
            {formJSX}
          </div>
        );
}

Form.propTypes = {
  selectedForm: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  signupDone: PropTypes.bool.isRequired,
  forgotPassDone: PropTypes.bool.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  loadingLogIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => (
  {
    selectedForm: state.selectedForm,
    email: state.email,
    password: state.password,
    name: state.name,
    signupDone: state.signupDone,
    forgotPassDone: state.forgotPassDone,
    loggedInUser: state.loggedInUser,
    loggedIn: state.loggedIn,
    loadingLogIn: state.loadingLogIn,
  }
);

export default connect(mapStateToProps)(Form);
