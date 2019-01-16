import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';

const Form = (props) => {
    const { dispatch, selectedForm, email, password, name, signupDone } = props;
    const changeForm = bindActionCreators(InterfaceActionCreators.changeForm, dispatch);
    const formSubmit = bindActionCreators(InterfaceActionCreators.formSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    let formJSX;
    if(selectedForm === "LOGIN"){
      formJSX = <form className="loginFormDiv" onSubmit={(e)=>{formSubmit(e,"login"); props.history.push('/profile') }}>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="email" value={email} placeholder="Enter email" onChange={(e)=>keyPressedOnForm("email",e)}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>keyPressedOnForm("password",e)}/>
                  </div>
                  <button type="submit" className="btn btn-block btn-primary" >Log In</button>
                </form>;
    } else {
      formJSX = <form className="loginFormDiv" onSubmit={(e)=>formSubmit(e,"signup")}>
                  {(!signupDone) ?
                  <div>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter name" value={name} onChange={(e)=>keyPressedOnForm("name",e)}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" id="email" aria-describedby="email" placeholder="Enter email" value={email} onChange={(e)=>keyPressedOnForm("email",e)}/>
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e)=>keyPressedOnForm("password",e)}/>
                    </div>
                    <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                  </div>
                : <h3 className="text-center">Signup Done! You can login now.</h3>}
              </form>;
    }
    return(
          <div>
            <div className="loginChoiceDiv text-center">
              <div className="btn-group " role="group" aria-label="Basic example">
                <button type="button" className={`btn btn-secondary heading-min ${(selectedForm==="LOGIN")?" active":""}`} onClick={()=>changeForm("login")}>LOGIN</button>
                <button type="button" className={`btn btn-secondary heading-min ${(selectedForm==="SIGNUP")?" active":""}`} onClick={()=>changeForm("signup")}>SIGNUP</button>
              </div>
            </div>
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
}

const mapStateToProps = state => (
  {
    selectedForm: state.selectedForm,
    email: state.email,
    password: state.password,
    name: state.name,
    signupDone: state.signupDone,
  }
);

export default connect(mapStateToProps)(Form);
