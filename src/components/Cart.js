import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import CartItem from './CartItem';
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Cart = (props) => {
  const { dispatch, courses } = props;
  const removeCartItem = bindActionCreators(InterfaceActionCreators.removeCartItem, dispatch);

  let ItemsJSX;
  ItemsJSX = courses.map((course,index)=>{
      if(course.inCart){
        return (
          <li key={index}>
            <div className="cartItemLink">
              <div className="row m-auto">
                <div className="col-lg-1">
                  {index+1}.
                </div>
                <div className="col-lg-2">
                   <img src={course.imgSrc} className="cartImg" />
                </div>
                <div className="col-lg-3">
                  <p className="heading-min"> {course.name} - Price: {course.price} {course.currency}</p>
                </div>
                <div className="col-lg-4">
                  <button className="btn btn-danger float-right" onClick={()=>removeCartItem(course.id)}>Remove</button>
                </div>
              </div>
            </div>
          </li>
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
      transitionName={props.match.path === '/cart' ? 'SlideIn' : 'SlideOut'}
    >
        <div className="hero-sm">
            <div className="row justify-content-center fullview-sm">
              <h1 className="font-primary align-self-center">Add Courses to the cart to buy them. More courses upcoming soon!</h1>
            </div>
        </div>
        <div className="container fullview">
          <div className="cart">
            <div className="cartDiv">
              <ul>
                {ItemsJSX}
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary heading-min float-right" to="/checkout">
            Checkout
          </Link>
        </div>
        </ReactCSSTransitionGroup>
      </div>
      );
}

Cart.propTypes = {
  courses: PropTypes.array.isRequired,
}

const mapStateToProps = state => (
  {
    courses: state.courses,
  }
);

export default connect(mapStateToProps)(Cart);
