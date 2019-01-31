import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AdminCourses = (props) => {
    const { dispatch, loggedInUser, ad, adSaved } = props;
    const adminAdSubmit = bindActionCreators(InterfaceActionCreators.adminAdSubmit, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);

    return(
      <div className="tab-body">
        <form className="">
          <div className="row">
            <div className="col-sm-12 col-lg-12">
              <div className="form-group">
                <label htmlFor="client">Ad Client ID (eg: ca-pub-***********)</label>
                <input type="text" className="form-control" id="client" aria-describedby="client" placeholder="Enter Client ID" defaultValue={ad.client} onChange={(e)=>keyPressedOnForm("ad-client",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="slot">Ad Slot ID (eg: 123123****)</label>
                <input type="text" className="form-control" id="slot" aria-describedby="slot" placeholder="Enter slot" defaultValue={ad.slot} onChange={(e)=>keyPressedOnForm("ad-slot",e)}/>
              </div>
            </div>
          </div>
          <button type="submit" className={`btn btn-block btn-success`} onClick={(e)=>adminAdSubmit(e)}>{(adSaved) ? "Saved" : "Save Ad"}</button>
          {/*(postSaved) ? <h6 className="font-secondary text-center">Posted</h6> : ""*/}
          <hr />
        </form>
      </div>
    );
}

AdminCourses.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  adSaved: PropTypes.bool.isRequired,
  ad: PropTypes.object.isRequired
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    adSaved: state.couponSaved,
    ad: state.ad,
  }
);

export default connect(mapStateToProps)(AdminCourses);
