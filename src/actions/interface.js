import * as InterfaceActionTypes from '../actiontypes/interface';

export const changeForm = type => {
  if(type === "login"){
    return {
      type: InterfaceActionTypes.SELECT_LOGIN,
    };
  } else if(type === "signup") {
    return {
      type: InterfaceActionTypes.SELECT_SIGNUP,
    };
  }
};

export const showCart = () => {
  return {
    type: InterfaceActionTypes.CART_TOGGLE,
  };
};

export const removeCartItem = (id) => {
  return {
    type: InterfaceActionTypes.REMOVE_CART_ITEM,
    id
  };
};

export const addCartItem = (id) => {
  return {
    type: InterfaceActionTypes.ADD_CART_ITEM,
    id
  };
};


export const keyPressedOnForm = (type,e) => {
  if(type === "email"){
    return {
      type: InterfaceActionTypes.TYPING_EMAIL,
      value: e.target.value
    };
  } else if(type === "password") {
    return {
      type: InterfaceActionTypes.TYPING_PASSWORD,
      value: e.target.value
    };
  } else if(type === "name") {
   return {
     type: InterfaceActionTypes.TYPING_NAME,
     value: e.target.value
   };
 }
};
