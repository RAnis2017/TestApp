import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import CartItem from './CartItem';
import { Link } from 'react-router-dom'

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
              {index+1}.
                <div className="col-sm-2">
                   <img src={course.imgSrc} className="cartImg" />
                </div>
                <div className="col-sm-5">
                  <p> {course.name} - Price: {course.price} {course.currency}</p>
                </div>
                <div className="col-sm-4">
                  <button className="btn btn-danger" onClick={()=>removeCartItem(course.id)}>Remove</button>
                </div>
              </div>
            </div>
          </li>

        );
      }
  })
  return(
        <div className="cart">
          <div className="cartDiv">
            <ul>
              {ItemsJSX}
            </ul>
            <Link type="button" className="btn btn-primary btn-block" to={`/checkout`}>Check Out!</Link>
          </div>
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
