import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import axios from "axios";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Checkout = (props) => {
    const { dispatch, courses, apiUrl, loggedInUser, coupon, couponOff, total, couponSuccess } = props;
    const coursesBought = bindActionCreators(InterfaceActionCreators.coursesBought, dispatch);
    const showCart = bindActionCreators(InterfaceActionCreators.showCart, dispatch);
    const checkCouponCode = bindActionCreators(InterfaceActionCreators.checkCouponCode, dispatch);
    const checkTotal = bindActionCreators(InterfaceActionCreators.checkTotal, dispatch);
    const keyPressedOnForm = bindActionCreators(InterfaceActionCreators.keyPressedOnForm, dispatch);
    showCart();
    checkTotal();
    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
            let coursesIDs = "";
            let oldCourses = [];

            let completeCoursesIDs = "";
            loggedInUser.courses.map((course,index)=>{
                  completeCoursesIDs += `${course.id},`;
                  let obj = {id: course.id, objFull: {...course}};
                  oldCourses.push(obj);
            });
            courses.map((course,index)=>{
                if(course.inCart){
                  coursesIDs += `${course.id},`;
                  completeCoursesIDs += `${course.id},`;
                }
            });
            console.log("The payment was succeeded!", payment);
            axios
              .post(`${apiUrl}coursesBought`, {
                data: JSON.stringify({
                  token: localStorage.getItem('genhex-auth-token'),
                  ids: coursesIDs,
                  completeids: completeCoursesIDs,
                  courses: oldCourses
                })
              })
              .then(response => {
                console.log(response);
                coursesBought();
              });
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state

    const client = {
        sandbox:    'AacmqqN9sJph2Dx3BFj5GfGkiAeyqwLYCcVtZcJ6PFrNzOY7sAjhMOUCnQf_kYG0LXYSlb0NnQxpuJB_',
        production: 'AUziJB4Vnn9_wBSKBfpo-7CuBdMsaluyPMX0Gj85I0XKnNEvODptkUh8khWam6yyMrLIT6WNqAFZA_Uf',
    }
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!

    let ItemsJSX;
    ItemsJSX = courses.map((course,index)=>{
        if(course.inCart){
          return (

              <div className="checkout" key={index}>
                <div className="row m-auto">
                  <div className="col-lg-3">
                    <img src={course.imgSrc} className="checkoutImg" />
                  </div>
                  <div className="col-lg-9">
                    <h3 className="font-primary">{course.name} - Price: {course.price} {course.currency}</h3>
                  </div>
                </div>
              </div>

          );
        }
    })

    return(
      <div>
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName={props.match.path === '/checkout' ? 'SlideIn' : 'SlideOut'}
      >
          <div className="hero-sm">
              <div className="row justify-content-center fullview-sm">
                <h1 className="font-primary align-self-center">Add Courses to the cart to buy them. More courses upcoming soon!</h1>
              </div>
          </div>
          <div className="container fullview">
            {ItemsJSX}
            <div className="float-right text-center">
            <h3 className="text-center font-secondary">Total:</h3><h5 className="text-center font-accent">{total} {currency}</h5>
            {
              (loggedInUser.name.length < 1) ? <Link className={`btn btn-success`} to={`/`}>Login or Sign up first!</Link>
              :
              <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} shipping={1}/>
            }
            <hr />
            <input type="text" className="form-control" id="coupon" aria-describedby="coupon" placeholder="Coupon Code" value={coupon} onChange={(e)=>keyPressedOnForm("coupon",e)}/>
             {(couponOff.length > 0) ? "" : <button type="submit" className={`btn btn-block btn-success`} onClick={(e)=>checkCouponCode(e)}>Apply</button>}
             {(couponSuccess === "1") ? <p className="text-center font-primary">Coupon Applied</p> : (couponSuccess === "0") ? <p className="text-center font-primary">Coupon Invalid</p> : ""}
            </div>

          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
}

Checkout.propTypes = {
  courses: PropTypes.array.isRequired,
  apiUrl: PropTypes.string.isRequired,
  coupon: PropTypes.string.isRequired,
  couponOff: PropTypes.string.isRequired,
  couponSuccess: PropTypes.string.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
}

const mapStateToProps = state => (
  {
    courses: state.courses,
    apiUrl: state.apiUrl,
    loggedInUser: state.loggedInUser,
    coupon: state.coupon,
    couponOff: state.couponOff,
    couponSuccess: state.couponSuccess,
    total: state.total,
  }
);

export default connect(mapStateToProps)(Checkout);
