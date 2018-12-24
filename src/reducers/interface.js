import * as InterfaceActionTypes from '../actiontypes/interface';

const initialState = {
  selectedForm: "LOGIN",
  email: "",
  password: "",
  name: "",
  cartToggle: false,
  courses: [
    {
      id: 1,
      name: "GET TEST 2018",
      price: "180",
      currency: "USD",
      availability: "released",
      description: "Some long description about this particular course",
      mcqQuantity: 100,
      duration: 3,
      inCart: true,
      path: "/about",
      imgSrc: "https://gs-post-images.grdp.co/2018/6/gate-img1529910709846-84.png-rs-high-webp.png"
    },
    {
      id: 2,
      name: "SAT TEST 2018",
      price: "1800",
      currency: "INR",
      availability: "comingsoon",
      description: "Some long description about this particular course",
      mcqQuantity: 90,
      duration: 2,
      inCart: false,
      path: "/",
      imgSrc: "https://gs-post-images.grdp.co/2018/6/gate-img1529910709846-84.png-rs-high-webp.png"
    }
  ]
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
    case InterfaceActionTypes.CART_TOGGLE: {
          return {
            ...state,
    				cartToggle: !state.cartToggle
    		 	};
	 	}
    case InterfaceActionTypes.REMOVE_CART_ITEM: {
          return {
            ...state,
    				courses: state.courses.filter((course)=> course.id !== action.id)
    		 	};
	 	}
    default:
      return state;
  }
}
