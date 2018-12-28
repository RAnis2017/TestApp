import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'

const UserPerformance = (props) => {
    const { dispatch, loggedInUser } = props;
    const userSettingSubmit = bindActionCreators(InterfaceActionCreators.userSettingSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);

    return(
      <div className="tab-body">
        <form className="" onSubmit={(e)=>userSettingSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Enter name" value={loggedInUser.name} onChange={(e)=>keyPressedOnForm("edit-name",e)}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="email" value={loggedInUser.email} placeholder="Enter email" onChange={(e)=>keyPressedOnForm("edit-email",e)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={loggedInUser.password} onChange={(e)=>keyPressedOnForm("edit-password",e)}/>
          </div>
          <button type="submit" className="btn btn-block btn-success" >Save Changes</button>
        </form>
      </div>
    );
}

UserPerformance.propTypes = {
  loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser
  }
);

export default connect(mapStateToProps)(UserPerformance);
