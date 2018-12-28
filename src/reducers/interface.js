import * as InterfaceActionTypes from '../actiontypes/interface';

const initialState = {
  selectedForm: "LOGIN",
  loggedInUser: {},
  signupDone: false,
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
      inCart: false,
      path: "/about",
      imgSrc: "https://gs-post-images.grdp.co/2018/6/gate-img1529910709846-84.png-rs-high-webp.png"
    },
    {
      id: 2,
      name: "SAT TEST 2018",
      price: "1800",
      currency: "INR",
      availability: "released",
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
    case InterfaceActionTypes.LOGIN_SUBMIT: {
          if(state.email === "abc@gmail.com" && state.password === "abc123"){
            return {
              ...state,
      				loggedInUser: {email: state.email, name: "Raza Anis", courses: [
                {
                  id: 1,
                  name: "GET TEST 2018",
                  price: "180",
                  currency: "USD",
                  availability: "released",
                  description: "Some long description about this particular course",
                  mcqQuantity: 100,
                  duration: 3,
                  inCart: false,
                  path: "/about",
                  imgSrc: "https://gs-post-images.grdp.co/2018/6/gate-img1529910709846-84.png-rs-high-webp.png"
                }
              ]
              }
      		 	};
          } else {
            return {
              ...state,
      				loggedInUser: {}
      		 	};
          }
	 	}
    case InterfaceActionTypes.SIGNUP_SUBMIT: {
        return {
          ...state,
  				signupDone: true
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
    				courses: state.courses.map((course)=> (course.id == action.id) ? {...course,inCart:false} : course)
    		 	};
	 	}
    case InterfaceActionTypes.ADD_CART_ITEM: {
          return {
            ...state,
    				courses: state.courses.map((course)=> (course.id == action.id) ? {...course,inCart:true} : course)
    		 	};
	 	}
    default:
      return state;
  }
}
