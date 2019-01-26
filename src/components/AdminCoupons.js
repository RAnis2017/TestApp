import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AdminCourses = (props) => {
    const { dispatch, loggedInUser, newCoupon, couponSaved, coupons } = props;
    const adminCouponSubmit = bindActionCreators(InterfaceActionCreators.adminCouponSubmit, dispatch);
    const adminCouponDelete = bindActionCreators(InterfaceActionCreators.adminCouponDelete, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    let ItemsJSX = coupons.map((coupon,key)=>{
      return (
        <div className="row" key={key}>
          <div className="col-sm-12 col-lg-12">
            <div className="courseItem">
              <div className="courseName font-primary">
                <h4>Code: {coupon.code} | Off Percentage: {coupon.off}%</h4>
              </div>
              <button type="submit" className={`btn btn-block btn-danger`} onClick={(e)=>adminCouponDelete(e,coupon.id)}>Delete</button>
            </div>
          </div>
        </div>
      );
    });
    return(
      <div className="tab-body">
        <form className="">
          <div className="row">
            <div className="col-sm-12 col-lg-12">
              <div className="form-group">
                <label htmlFor="code">Coupon Code</label>
                <input type="text" className="form-control" id="code" aria-describedby="code" placeholder="Enter coupon code" value={newCoupon.code} onChange={(e)=>keyPressedOnForm("coupon-code",e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="off">Coupon Off Percentage</label>
                <input type="text" className="form-control" id="off" aria-describedby="off" placeholder="Enter coupon off percentage (eg: 20, 100)" value={newCoupon.off} onChange={(e)=>keyPressedOnForm("coupon-off",e)}/>
              </div>
            </div>
          </div>
          <button type="submit" className={`btn btn-block btn-success`} onClick={(e)=>adminCouponSubmit(e)}>Add Coupon</button>
          {/*(postSaved) ? <h6 className="font-secondary text-center">Posted</h6> : ""*/}
          <hr />
          { ItemsJSX }
        </form>
      </div>
    );
}

AdminCourses.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  couponSaved: PropTypes.bool.isRequired,
  newCoupon: PropTypes.object.isRequired,
  coupons: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
    couponSaved: state.couponSaved,
    newCoupon: state.newCoupon,
    coupons: state.coupons,
  }
);

export default connect(mapStateToProps)(AdminCourses);
