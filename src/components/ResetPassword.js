import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import Loading from './Loading';

const Form = (props) => {
    const { dispatch, password, confirmPassword } = props;
    const formSubmit = bindActionCreators(InterfaceActionCreators.formSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    let formJSX;
    let confirmPass;
    formJSX = <form className="loginFormDiv" onSubmit={(e)=>{formSubmit(e,"reset",(routeToGo)=>{props.history.push('/'+routeToGo)},props.match.params.token)}}>
                <div className="form-group">
                  <label htmlFor="password">Enter new Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>keyPressedOnForm("password",e)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" value={confirmPassword} onChange={(e)=>keyPressedOnForm("confirmPassword",e)}/>
                </div>
                <button type="submit" className={`btn btn-block btn-primary ${(confirmPassword === password) ? "" : "disabled"}`}>Reset Password</button>
              </form>;

    return(
        <div className="hero-bg-resetPass">
          <div className="row justify-content-center fullview">
            <div className="col-lg-4 align-self-center text-center">
              <div>
                {formJSX}
              </div>
            </div>
          </div>
        </div>
        );
}

Form.propTypes = {
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
}

const mapStateToProps = state => (
  {
    password: state.password,
    confirmPassword: state.confirmPassword,
  }
);

export default connect(mapStateToProps)(Form);
