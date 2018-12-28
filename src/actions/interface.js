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

export const formSubmit = (e,type) => {
  e.preventDefault();
  if(type === "login"){
    return {
      type: InterfaceActionTypes.LOGIN_SUBMIT,
    };
  } else if(type === "signup") {
    return {
      type: InterfaceActionTypes.SIGNUP_SUBMIT,
    };
  }
};

export const userSettingSubmit = (e) => {
  e.preventDefault();
  return {
    type: InterfaceActionTypes.USER_SETTING_SAVE,
  };
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
 } else if(type === "edit-email"){
   return {
     type: InterfaceActionTypes.EDIT_TYPING_EMAIL,
     value: e.target.value
   };
 } else if(type === "edit-password") {
   return {
     type: InterfaceActionTypes.EDIT_TYPING_PASSWORD,
     value: e.target.value
   };
 } else if(type === "edit-name") {
  return {
    type: InterfaceActionTypes.EDIT_TYPING_NAME,
    value: e.target.value
  };
}
};
