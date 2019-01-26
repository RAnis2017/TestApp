import * as InterfaceActionTypes from '../actiontypes/interface';
import axios from "axios";
import md5 from "md5";

const initialState = {
  apiUrl: "http://localhost:80/vinodkatrelaapi/public/", // localhost:80 genesishexdevs.com
  selectedForm: "LOGIN",
  loggedInUser: {email: "", name: "", password: "", courses: []},
  signupDone: false,
  forgotPassDone: false,
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  cartToggle: false,
  selectedQuestion: 0,
  timeout: false,
  users: [],
  total: 0,
  loggedIn: false,
  loadingLogIn: false,
  markedForReview: [],
  courseSaved: false,
  coupon: "",
  couponOff: "",
  couponSuccess: "",
  newPost: {},
  newCoupon: {},
  posts: [],
  coupons: [],
  postSaved: false,
  couponSaved: false,
  newTest: {
    hours: 0,
    mins: 0,
    secs: 0,
    lastTakenDate: "",
    lastScore: 0,
    lastCorrect: 0,
    lastIncorrect: 0,
    timerOver: false,
    firstTimeCorrect: 0,
    timeOver: false,
    questions: []
  },
  newCourse: {
    currency: "USD",
    timeOver: false,
    inCart: false,
    tests: [],
  },
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
    case InterfaceActionTypes.SELECT_FORGOT_PASS: {
          return {
            ...state,
    				selectedForm: "FORGOTPASS"
    		 	};
	 	}
    case InterfaceActionTypes.TYPING_EMAIL: {
          return {
            ...state,
    				email: action.value
    		 	};
	 	}
    case InterfaceActionTypes.TYPING_COUPON_CODE: {
          return {
            ...state,
    				coupon: action.value
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
    case InterfaceActionTypes.MARK_REVIEW: {
          let markedForReview = state.markedForReview;
          if (!markedForReview.includes(action.qID)) { markedForReview.push(action.qID) }
          let courses = state.loggedInUser.courses.map((outerCourse)=>{
            outerCourse.tests.map((course)=>{

            });
            return outerCourse;
          });
          return {
            ...state,
    				markedForReview: markedForReview,
            loggedInUser: { ...state.loggedInUser, courses: courses }
    		 	};
	 	}
    case InterfaceActionTypes.SIGN_OUT: {
          localStorage.removeItem("genhex-auth-token");
          return {
            ...state,
            loggedInUser: {email: "", name: "", password: "", courses: []}
    		 	};
	 	}
    case InterfaceActionTypes.EDIT_TYPING_EMAIL: {
          return {
            ...state,
    				loggedInUser: {...state.loggedInUser, email: action.value }
    		 	};
	 	}
    case InterfaceActionTypes.EDIT_CONFIRM_PASSWORD: {
          return {
            ...state,
    				confirmPassword: action.value
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
            loggedInUser: action.user,
            loggedIn: (action.user.name.length > 0),
            loadingLogIn: false
          };
	 	}
    case InterfaceActionTypes.LOGIN_LOADING: {

          return {
            ...state,
            loadingLogIn: true
          };
	 	}
    case InterfaceActionTypes.SELECT_QUESTION: {
          return {
            ...state,
    				selectedQuestion: parseInt(action.id)
    		 	};
	 	}
    case InterfaceActionTypes.USERS_LIST: {
          return {
            ...state,
    				users: action.users
    		 	};
	 	}
    case InterfaceActionTypes.ADMIN_TEST_ADD: {
          return {
            ...state,
    				newTest: {}
    		 	};
	 	}
    case InterfaceActionTypes.SAVE_POST: {
          return {
            ...state,
    				newPost: {},
            posts: action.posts,
            postSaved: true,
    		 	};
	 	}
    case InterfaceActionTypes.SAVE_COUPON: {
          return {
            ...state,
    				newCoupon: {},
            coupons: action.coupons,
            couponSaved: true,
    		 	};
	 	}
    case InterfaceActionTypes.GET_POSTS: {
          return {
            ...state,
            posts: action.posts,
    		 	};
	 	}
    case InterfaceActionTypes.GET_COUPONS: {
          return {
            ...state,
            coupons: action.coupons,
    		 	};
	 	}
    case InterfaceActionTypes.SELECT_COURSE: {
          let newCourse;
          state.loggedInUser.courses.map((course)=>{
            if(course.id === action.cID){
              newCourse = course;
            }
          });
          return {
            ...state,
    				newCourse
    		 	};
	 	}
    case InterfaceActionTypes.SELECT_TEST: {
          let newTest;
          state.newCourse.tests.map((test)=>{
            if(test.id === action.tID){
              newTest = test;
            }
          });
          return {
            ...state,
    				newTest
    		 	};
	 	}
    case InterfaceActionTypes.DELETE_COURSE: {

          return {
            ...state,
            newCourse: {
              currency: "USD",
              timeOver: false,
              inCart: false,
              tests: [],
              id: "",
            },
            newTest: {
              id: "",
              name: "",
              mcqQuantity: 0,
              availability: "",
              duration: 0,
              passRequirementPercentage: "",
              path: "",
              hours: 0,
              mins: 0,
              secs: 0,
              lastTakenDate: "",
              lastScore: 0,
              lastCorrect: 0,
              lastIncorrect: 0,
              timerOver: false,
              firstTimeCorrect: 0,
              timeOver: false,
              questions: []
            }
    		 	};
	 	}
    case InterfaceActionTypes.QUESTION_NEXT: {
          let oldCourses = [];
          let makeRequest = false;
          let courses = state.loggedInUser.courses.map((outerCourse)=>{
            outerCourse.tests.map((course)=>{
              if(course.id === action.cid){
                if(parseInt(state.selectedQuestion) === parseInt(course.mcqQuantity)){
                  course.timeOver = true;
                  makeRequest = true;
                  if(course.firstTimeCorrect === 0){
                    course.firstTimeCorrect = course.lastCorrect;
                  }
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
    				selectedQuestion: parseInt(state.selectedQuestion)+1,
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
          if(isNaN(accuracy)){
            accuracy = 0;
          }
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
                      if(course.firstTimeCorrect === 0){
                        accuracy += ((course.lastCorrect)/course.mcqQuantity)*100;
                        console.log("Accuracy should change ",accuracy);
                      }
                    }
                });
              }
            });
            return outerCourse;
          });
          return {
            ...state,
    				loggedInUser: { ...state.loggedInUser, accuracy: accuracy, courses: courses }
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
            console.log(response);
            localStorage.setItem('genhex-auth-token', response.data.token);
          });
          return {
            ...state,
            signupDone: true
          };
	 	}
    case InterfaceActionTypes.CONVERT_FILE: {

          return {
            ...state,
            newTest: { ...state.newTest, questions: action.questions}
          };
	 	}
    case InterfaceActionTypes.ADD_TEST: {
          let newCourse = state.newCourse;
          newCourse.tests = newCourse.tests.filter((test)=>(test.id !== state.newTest.id));
          newCourse.tests.push({id: newCourse.tests.length+1,...state.newTest});
          return {
            ...state,
            newCourse,
            newTest: {
              name: "",
              mcqQuantity: 0,
              availability: "",
              duration: 0,
              passRequirementPercentage: "",
              path: "",
              hours: 0,
              mins: 0,
              secs: 0,
              lastTakenDate: "",
              lastScore: 0,
              lastCorrect: 0,
              lastIncorrect: 0,
              timerOver: false,
              firstTimeCorrect: 0,
              timeOver: false,
              questions: []
            }
          };
	 	}
    case InterfaceActionTypes.RESET_PASS_SUBMIT: {
        axios
          .post(`${state.apiUrl}resetPassword`, {
            data: JSON.stringify({
              obj:  {password: state.password},
              token: action.token
            })
          })
          .then(response => {
            console.log(response);
          });
          return {
            ...state,
          };
	 	}
    case InterfaceActionTypes.FORGOT_PASS_SUBMIT: {
        axios
          .post(`${state.apiUrl}forgotpass`, {
            data: JSON.stringify({
              obj:  {email: state.email},
            })
          })
          .then(response => {
            console.log(response);
          });
          return {
            ...state,
            forgotPassDone: true
          };
	 	}
    case InterfaceActionTypes.TYPING_COURSE: {
          let newCourse = state.newCourse;
          newCourse[action.propertyType.split("-")[1]] = (action.propertyType.split("-")[1] === "mcqQuantity" || action.propertyType.split("-")[1] === "duration") ? parseInt(action.value) : action.value;
          return {
            ...state,
            newCourse,
          };
	 	}
    case InterfaceActionTypes.TYPING_TEST: {
          let newTest = state.newTest;
          newTest[action.propertyType.split("-")[1]] = (action.propertyType.split("-")[1] === "mcqQuantity" || action.propertyType.split("-")[1] === "duration") ? parseInt(action.value) : action.value;
          return {
            ...state,
            newTest,
          };
	 	}
    case InterfaceActionTypes.TYPING_POST: {
          let newPost = state.newPost;
          newPost[action.propertyType.split("-")[1]] = action.value;

          return {
            ...state,
            newPost
          };
	 	}
    case InterfaceActionTypes.TYPING_COUPON: {
          let newCoupon = state.newCoupon;
          newCoupon[action.propertyType.split("-")[1]] = action.value;

          return {
            ...state,
            newCoupon
          };
	 	}
    case InterfaceActionTypes.CHECK_COUPON_CODE: {

          return {
            ...state,
            couponOff: action.off,
            total: state.total*((100-parseInt(action.off))/100),
            couponSuccess: (action.off.length > 0) ? "1" : "0"
          };
	 	}
    case InterfaceActionTypes.CHECK_TOTAL: {
          let total=0;
          if(state.couponOff.length > 0){
            total = state.total;
          } else {
            state.courses.map((course,index)=>{
                if(course.inCart){
                  total += parseInt(course.price);
                }
            })
          }
          return {
            ...state,
            total: total,
          };
	 	}
    case InterfaceActionTypes.SAVE_COURSE: {
          return {
            ...state,
            courseSaved: (action.success === "1"),
          };
	 	}
    case InterfaceActionTypes.UPDATE_COURSE: {
          return {
            ...state,
            courseSaved: (action.success === "1"),
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
              } else {
                courses.push(false);
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
