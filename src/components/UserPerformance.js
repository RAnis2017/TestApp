import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'

const UserPerformance = (props) => {
    const { dispatch, loggedInUser } = props;
    const courses = loggedInUser.courses;
    let ItemsJSX;
    ItemsJSX = courses.map((course,index)=>{

          return (
            <div></div>
          );
    })
    return(
      <div className="tab-body">
        {ItemsJSX}
      </div>
    );
}

UserPerformance.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(UserPerformance);
