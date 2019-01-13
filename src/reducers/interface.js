import * as InterfaceActionTypes from '../actiontypes/interface';
import axios from "axios";
import md5 from "md5";

const initialState = {
  apiUrl: "http://localhost:80/vinodkatrelaapi/public/", // localhost:80
  selectedForm: "LOGIN",
  loggedInUser: {email: "", name: "", password: "", courses: []},
  signupDone: false,
  email: "",
  password: "",
  name: "",
  cartToggle: false,
  selectedQuestion: 0,
  timeout: false,
  users: [],
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
      price: "18",
      currency: "USD",
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
          return {
            ...state,
            loggedInUser: action.user
          };
	 	}
    case InterfaceActionTypes.SELECT_QUESTION: {
          return {
            ...state,
    				selectedQuestion: action.id
    		 	};
	 	}
    case InterfaceActionTypes.USERS_LIST: {
          return {
            ...state,
    				users: action.users
    		 	};
	 	}
    case InterfaceActionTypes.QUESTION_NEXT: {
          let oldCourses = [];
          let makeRequest = false;
          let courses = state.loggedInUser.courses.map((outerCourse)=>{
            outerCourse.tests.map((course)=>{
              if(course.id === action.cid){
                if(state.selectedQuestion === course.mcqQuantity){
                  course.timeOver = true;
                  makeRequest = true;
                }
              }

            });
            let obj = {id: outerCourse.id, objFull: {...outerCourse}};
            oldCourses.push(obj);
            return outerCourse;

          });
          if(makeRequest === true){
            axios
              .post(`${state.apiUrl}saveUserState`, {
                data: JSON.stringify({
                  token: localStorage.getItem('genhex-auth-token'),
                  user: {...state.loggedInUser},
                  courses: oldCourses,
                })
              })
              .then(response => {
                console.log(response);
              });
          }
          return {
            ...state,
    				selectedQuestion: ++state.selectedQuestion,
            loggedInUser: { ...state.loggedInUser, courses: courses }
    		 	};
	 	}
    case InterfaceActionTypes.QUESTION_PREV: {
          return {
            ...state,
    				selectedQuestion: --state.selectedQuestion
    		 	};
	 	}
    case InterfaceActionTypes.COURSES_MIN_GET: {
          return {
            ...state,
    				courses: action.courses
    		 	};
	 	}
    case InterfaceActionTypes.TIMER_OVER: {
      let courses = state.loggedInUser.courses.map((outerCourse)=>{
        outerCourse.tests.map((course)=>{
          if(course.id === action.cid){
            course.timeOver = true;
          }

        });
        return outerCourse;

      });
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, courses: courses }
      };
	 	}
    case InterfaceActionTypes.SELECT_ANSWER: {
          let accuracy = parseInt(state.loggedInUser.accuracy);
          let courses = state.loggedInUser.courses.map((outerCourse)=>{
            outerCourse.tests.map((course)=>{
              if(course.id === action.courseid){
                course.questions.map((question)=>{
                    if(question.id === action.qid){
                      question.selectedAnswer = `${action.ansid}`;
                      if(question.selectedAnswer === question.truthyOption){
                        course.lastCorrect++;
                      } else {
                        course.lastIncorrect++;
                      }
                      course.lastScore = (course.lastCorrect/course.mcqQuantity) * 100;
                      accuracy += ((parseInt(state.loggedInUser.totalMcqs)+1)/course.lastScore)*100;
                    }
                });
              }
            });
            return outerCourse;
          });
          return {
            ...state,
    				loggedInUser: { ...state.loggedInUser, totalMcqs: parseInt(state.loggedInUser.totalMcqs)+1, accuracy: accuracy, courses: courses }
    		 	};
	 	}
    case InterfaceActionTypes.RESET_TEST: {
          let courses = state.loggedInUser.courses.map((outerCourse)=>{
            outerCourse.tests.map((course)=>{
              if(course.id === action.courseid){
                  course.hours = 0;
                  course.mins = 0;
                  course.secs = 0;
                  course.lastScore = 0.0;
                  course.lastCorrect = 0;
                  course.timeOver = false;
                  course.lastIncorrect = 0;
                  course.questions.map((question,key) => {
                    question.selectedAnswer = 0;
                  });
              }
            });
            return outerCourse;
          });
          return {
            ...state,
    				loggedInUser: { ...state.loggedInUser, courses: courses }
    		 	};
	 	}

    case InterfaceActionTypes.SIGNUP_SUBMIT: {
        axios
          .post(`${state.apiUrl}signup`, {
            data: JSON.stringify({
              obj:  {email: state.email, name: state.name, password: md5(state.password), nextPath:"", accuracy: "0", totalMcqs: "0", recentPackages: [], posts: [], courses: []},
            })
          })
          .then(response => {
            // console.log(response);
            localStorage.setItem('genhex-auth-token', response.data.token);
          });
          return {
            ...state,
            signupDone: true
          };
	 	}
    case InterfaceActionTypes.USER_SETTING_SAVE: {
        return {
          ...state,
  				loggedInUser: {...state.loggedInUser}
  		 	};
	 	}
    case InterfaceActionTypes.LOAD_USER: {
          let courses = [];
          let i = 0;
          state.courses.map((course, key)=>{
            i = key;
            if(typeof action.user.courses[i] !== 'undefined'){
              if(course.id !== action.user.courses[i].id){
                courses.push(course);
              }
            } else {
              courses.push(course);
            }
          });

        return {
          ...state,
  				loggedInUser: action.user,
          courses
  		 	};
	 	}
    case InterfaceActionTypes.CART_TOGGLE: {
          return {
            ...state,
    				cartToggle: !state.cartToggle
    		 	};
	 	}
    case InterfaceActionTypes.COURSES_BOUGHT: {
          let courses = state.courses.map((course,index)=>{
              if(course.inCart){
                return false;
              }
              return true;
          });
          return {
            ...state,
    				courses: courses
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
