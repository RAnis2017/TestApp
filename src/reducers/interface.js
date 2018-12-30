import * as InterfaceActionTypes from '../actiontypes/interface';

const initialState = {
  selectedForm: "LOGIN",
  loggedInUser: {email: "", name: "", password: "", courses: []},
  signupDone: false,
  email: "",
  password: "",
  name: "",
  cartToggle: false,
  selectedQuestion: 0,
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
    case InterfaceActionTypes.EDIT_TYPING_EMAIL: {
          return {
            ...state,
    				loggedInUser: {...state.loggedInUser, email: action.value }
    		 	};
	 	}
    case InterfaceActionTypes.EDIT_TYPING_PASSWORD: {
          return {
            ...state,
    				loggedInUser: {...state.loggedInUser, password: action.value }
    		 	};
	 	}
    case InterfaceActionTypes.EDIT_TYPING_NAME: {
          return {
            ...state,
    				loggedInUser: {...state.loggedInUser, name: action.value }
    		 	};
	 	}
    case InterfaceActionTypes.LOGIN_SUBMIT: {
          if(state.email === "abc@gmail.com" && state.password === "abc123"){
            return {
              ...state,
      				loggedInUser: {email: state.email, name: "Raza Anis", password: "abc123", courses: [
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
                  path: "get-test-2018",
                  imgSrc: "https://gs-post-images.grdp.co/2018/6/gate-img1529910709846-84.png-rs-high-webp.png",
                  questions: [
                    {
                      id: 1,
                      title: "What QUESTION",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "4",
                      selectedAnswer: 0,
                    },
                    {
                      id: 2,
                      title: "What QUESTION 2",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "2",
                      selectedAnswer: 0,
                    },
                    {
                      id: 3,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 4,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 5,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 6,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 7,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 8,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 9,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 10,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 11,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 12,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 13,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 14,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 15,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 16,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 17,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 18,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 19,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 20,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 21,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 22,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 23,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                    {
                      id: 24,
                      title: "What QUESTION 3",
                      question: "What is this?",
                      answer1: "Apple",
                      answer2: "Banana",
                      answer3: "Mango",
                      answer4: "All of these",
                      truthyOption: "3",
                      selectedAnswer: 0,
                    },
                  ]
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
    case InterfaceActionTypes.SELECT_QUESTION: {
          return {
            ...state,
    				selectedQuestion: action.id
    		 	};
	 	}
    case InterfaceActionTypes.SELECT_ANSWER: {
          let courses = state.loggedInUser.courses.map((course)=>{
            if(course.id === action.courseid){
              course.questions.map((question)=>{
                  if(question.id === action.qid){
                    question.selectedAnswer = `${action.ansid}`;
                  }
              });
            }
            return course;
          });
          return {
            ...state,
    				loggedInUser: { ...state.loggedInUser, courses: courses }
    		 	};
	 	}
    case InterfaceActionTypes.SIGNUP_SUBMIT: {
        return {
          ...state,
  				signupDone: true
  		 	};
	 	}
    case InterfaceActionTypes.USER_SETTING_SAVE: {
        return {
          ...state,
  				loggedInUser: {...state.loggedInUser, email: state.email, name: state.name, password: state.password}
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