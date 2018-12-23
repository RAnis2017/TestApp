import * as InterfaceActionTypes from '../actiontypes/interface';

const initialState = {
  selectedForm: "LOGIN",
  email: "",
  password: "",
  name: "",
}

export default function Interface(state=initialState, action) {

  switch(action.type){
    case InterfaceActionTypes.SELECT_LOGIN: {
          return {
            ...state,
    				selectedForm: "LOGIN"
    		 	};
	 	}
    case InterfaceActionTypes.SELECT_SIGNUP: {
          return {
            ...state,
    				selectedForm: "SIGNUP"
    		 	};
	 	}
    case InterfaceActionTypes.TYPING_EMAIL: {
          return {
            ...state,
    				email: action.value
    		 	};
	 	}
    case InterfaceActionTypes.TYPING_PASSWORD: {
          return {
            ...state,
    				password: action.value
    		 	};
	 	}
    case InterfaceActionTypes.TYPING_NAME: {
          return {
            ...state,
    				name: action.value
    		 	};
	 	}
    default:
      return state;
  }
}
