import * as InterfaceActionTypes from '../actiontypes/interface';
import axios from "axios";
import md5 from "md5";
import {store} from '../Store';

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
    return function action(dispatch) {
      let user = {email: "", name: "", password: "", courses: []};
      let courses = [];
      axios
        .post(`${store.getState().apiUrl}login`, {
          data: JSON.stringify({
            obj:  {email: store.getState().email, password: md5(store.getState().password)},
          })
        })
        .then(response => {
          // console.log(response);
          localStorage.setItem('genhex-auth-token', response.data.token);
          user = JSON.parse(response.data.user[0].obj);
          response.data.courses.map((course)=>{
            if (typeof course.objFull === 'string' || course.objFull instanceof String){
              courses.push({id:course.id,...JSON.parse(course.objFull)});
            }
            else {
              courses.push({id:course.id,...course.objFull});
            }
            // console.log(JSON.parse(course.objFull));
          })
          user.courses = courses;
          dispatch({
            type: InterfaceActionTypes.LOGIN_SUBMIT,
            user
          });
        });
    }
  } else if(type === "signup") {
      return {
        type: InterfaceActionTypes.SIGNUP_SUBMIT,
      };
  }
}

export const coursesMinGet = () => {
  return function action(dispatch) {
    let courses = [];
    axios
      .get(`${store.getState().apiUrl}getMinCourses`)
      .then(response => {
        // console.log(response);
        response.data.map((course)=>{
          courses.push({id:course.id,...JSON.parse(course.objMin)});
          // console.log(JSON.parse(course.objMin));
        })
        // console.log(courses);
        dispatch({
          type: InterfaceActionTypes.COURSES_MIN_GET,
          courses
        });
      });
  }
}

export const usersListGet = () => {
  return function action(dispatch) {
    let users = [];
    axios
      .get(`${store.getState().apiUrl}getUsersList`)
      .then(response => {
        response.data.users.map((user)=>{
          users.push({id:user.id,...JSON.parse(user.obj)});
          // console.log(JSON.parse(course.objMin));
        })
        // console.log(response);

        dispatch({
          type: InterfaceActionTypes.USERS_LIST,
          users
        });
      });
  }
}

export const userSettingSubmit = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    let user = store.getState().loggedInUser;
    axios
      .post(`${store.getState().apiUrl}saveSetting`, {
        data: JSON.stringify({
          obj:  user,
          token: localStorage.getItem('genhex-auth-token'),
        })
      })
      .then(response => {
        // console.log(response);
        dispatch({
          type: InterfaceActionTypes.USER_SETTING_SAVE
        });
      });
  }
}

export const loadLoggedInUser = () => {
  return function action(dispatch) {
    let user = {email: "", name: "", password: "", courses: []};
    let courses = [];
    let token = (localStorage.getItem('genhex-auth-token') != null) ? localStorage.getItem('genhex-auth-token') : "";
    axios
      .post(`${store.getState().apiUrl}authenticate`, {
        data: JSON.stringify({
          token: token,
        })
      })
      .then(response => {
        console.log(response);
        if(response.data.success !== "0"){
          user = JSON.parse(response.data.user[0].obj);
          response.data.courses.map((course)=>{
            if (typeof course.objFull === 'string' || course.objFull instanceof String){
              courses.push({id:course.id,...JSON.parse(course.objFull)});
            }
            else {
              courses.push({id:course.id,...course.objFull});
            }
          })
          user.courses = courses;
        }
        dispatch({
          type: InterfaceActionTypes.LOAD_USER,
          user
        });
      });
  }
}
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
export const coursesBought = () => {
  return {
    type: InterfaceActionTypes.COURSES_BOUGHT,
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

export const selectQuestion = (e,id) => {
  e.preventDefault();
  return {
    type: InterfaceActionTypes.SELECT_QUESTION,
    id
  };
};

export const selectAnswer = (courseid,qid,ansid) => {
  return {
    type: InterfaceActionTypes.SELECT_ANSWER,
    courseid,
    qid,
    ansid
  };
};

export const resetTest = (courseid) => {
  return {
    type: InterfaceActionTypes.RESET_TEST,
    courseid
  };
};

export const timeOver = (cid) => {
  return function action(dispatch) {
    let oldCourses = [];
    store.getState().loggedInUser.courses.map((outerCourse)=>{
      outerCourse.tests.map((course)=>{
        if(course.id === cid){
          course.timeOver = true;
        }
      });
      let obj = {id: outerCourse.id, objFull: {...outerCourse}};
      oldCourses.push(obj);
    });
    axios
      .post(`${store.getState().apiUrl}saveUserState`, {
        data: JSON.stringify({
          token: localStorage.getItem('genhex-auth-token'),
          user: {...store.getState().loggedInUser},
          courses: oldCourses,
        })
      })
      .then(response => {
        console.log(response);
        dispatch({
          type: InterfaceActionTypes.TIMER_OVER,
          cid
        });
      });

  }
}
export const nextPrevQuestion = (type,e,cid) => {
  e.preventDefault();
  if(type === "next"){
    return {
      type: InterfaceActionTypes.QUESTION_NEXT,
      cid
    };
  } else if(type === "prev") {
    return {
      type: InterfaceActionTypes.QUESTION_PREV,
    };
  }
};
