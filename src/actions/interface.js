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
  else if(type === "forgotpass") {
   return {
     type: InterfaceActionTypes.SELECT_FORGOT_PASS,
   };
 }
};

export const signOut = callback => {
 callback();
 return {
   type: InterfaceActionTypes.SIGN_OUT,
 };
};

export const markForReview = (e,qID) => {
  e.preventDefault();

  return {
    type: InterfaceActionTypes.MARK_REVIEW,
    qID
  };
};

export const formSubmit = (e,type,callback: null, resetToken: null) => {
  e.preventDefault();
  if(type === "login"){
    return function action(dispatch) {
      dispatch({
        type: InterfaceActionTypes.LOGIN_LOADING
      });
      let user = {email: "", name: "", password: "", courses: []};
      let courses = [];
      axios
        .post(`${store.getState().apiUrl}login`, {
          data: JSON.stringify({
            obj:  {email: store.getState().email, password: md5(store.getState().password)},
          })
        })
        .then(response => {
          console.log(response);
          if(response.data.success !== "0"){
            localStorage.setItem('genhex-auth-token', response.data.token);
            user = JSON.parse(response.data.user[0].obj);
            response.data.courses.map((course)=>{
              if (typeof course.objFull === 'string' || course.objFull instanceof String){
                courses.push({id:parseInt(course.id),...JSON.parse(course.objFull)});
              }
              else {
                courses.push({id:course.id,...course.objFull});
              }
              // console.log(JSON.parse(course.objFull));

            });
            user.password = "";
            if(response.data.role === 1){
              callback("admin-login");
              user.admin = true;
              axios
                .get(`${store.getState().apiUrl}adminCourses`)
                .then(response => {
                  console.log(response);
                  response.data.data.map((course)=>{
                    courses.push({id:parseInt(course.id),...JSON.parse(course.objFull)});
                    // console.log(JSON.parse(course.objMin));
                  })
                  console.log(courses);
                  user.courses = courses;
                  dispatch({
                    type: InterfaceActionTypes.LOGIN_SUBMIT,
                    user
                  });
                });
            } else {
              user.admin = false;
              if(courses.length > 0){
                callback("profile");
              } else {
                callback("courses");
              }
            }
          }
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
  } else if(type === "forgotpass") {
      return {
        type: InterfaceActionTypes.FORGOT_PASS_SUBMIT,
      };
  } else if(type === "reset") {
      callback("");
      return {
        type: InterfaceActionTypes.RESET_PASS_SUBMIT,
        token: resetToken
      };
  }
}

export const coursesMinGet = () => {
  return function action(dispatch) {
    let courses = [];
    axios
      .get(`${store.getState().apiUrl}getMinCourses`)
      .then(response => {
        console.log(response);
        response.data.map((course)=>{
          courses.push({id:course.id,...JSON.parse(course.objMin)});
          // console.log(JSON.parse(course.objMin));
        })
        console.log(courses);
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

export const loadPosts = () => {
  return function action(dispatch) {
    axios
      .get(`${store.getState().apiUrl}getPosts`)
      .then(response => {
        dispatch({
          type: InterfaceActionTypes.GET_POSTS,
          posts: response.data.posts
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
        console.log(response);
        dispatch({
          type: InterfaceActionTypes.USER_SETTING_SAVE
        });
      });
  }
}

export const adminPostSubmit = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    let newPost = store.getState().newPost;
    axios
      .post(`${store.getState().apiUrl}savePost`, {
        data: JSON.stringify({
          post:  newPost,
        })
      })
      .then(response => {
        // console.log(response);
        dispatch({
          type: InterfaceActionTypes.SAVE_POST,
          posts: response.data.posts,
        });
      });
  }
}

export const adminPostDelete = (e,id) => {
  e.preventDefault();
  return function action(dispatch) {
    axios
      .post(`${store.getState().apiUrl}deletePost`, {
        id
      })
      .then(response => {
        // console.log(response);
        dispatch({
          type: InterfaceActionTypes.GET_POSTS,
          posts: response.data.posts,
        });
      });
  }
}

export const adminCouponSubmit = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    let newCoupon = store.getState().newCoupon;
    axios
      .post(`${store.getState().apiUrl}saveCoupon`, {
        data: JSON.stringify({
          coupon:  newCoupon,
        })
      })
      .then(response => {
        // console.log(response);
        dispatch({
          type: InterfaceActionTypes.SAVE_COUPON,
          coupons: response.data.coupons,
        });
      });
  }
}

export const adminAdSubmit = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    let ad = store.getState().ad;
    axios
      .post(`${store.getState().apiUrl}saveAd`, {
        data: JSON.stringify({
          ad
        })
      })
      .then(response => {
        console.log(response);
        dispatch({
          type: InterfaceActionTypes.SAVE_AD,
          ad: response.data.ad[0]
        });
      });
  }
}

export const adminCouponDelete = (e,id) => {
  e.preventDefault();
  return function action(dispatch) {
    axios
      .post(`${store.getState().apiUrl}deleteCoupon`, {
        id
      })
      .then(response => {
        // console.log(response);
        dispatch({
          type: InterfaceActionTypes.GET_COUPONS,
          coupons: response.data.coupons,
        });
      });
  }
}

export const checkCouponCode = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    axios
      .post(`${store.getState().apiUrl}checkCoupon`, {
        code: store.getState().coupon
      })
      .then(response => {
        console.log(response);
        let off = "";
        if(response.data.off.length > 0){
          off = response.data.off[0].off;
        }
        dispatch({
          type: InterfaceActionTypes.CHECK_COUPON_CODE,
          off,
        });
      });
  }
}

export const loadCoupons = () => {
  return function action(dispatch) {
    axios
      .get(`${store.getState().apiUrl}getCoupons`)
      .then(response => {
        dispatch({
          type: InterfaceActionTypes.GET_COUPONS,
          coupons: response.data.coupons
        });
      });
  }
}

export const loadAd = () => {
  return function action(dispatch) {
    axios
      .get(`${store.getState().apiUrl}getAd`)
      .then(response => {
        dispatch({
          type: InterfaceActionTypes.GET_AD,
          ad: response.data.ad[0]
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
              courses.push({id:parseInt(course.id),...JSON.parse(course.objFull)});
            }
            else {
              courses.push({id:course.id,...course.objFull});
            }
          })
          user.password = "";
          if(response.data.role === 1){
            user.admin = true;
            axios
              .get(`${store.getState().apiUrl}adminCourses`)
              .then(response => {
                console.log(response);
                response.data.data.map((course)=>{
                  courses.push({id:parseInt(course.id),...JSON.parse(course.objFull)});
                  // console.log(JSON.parse(course.objMin));
                })
                console.log(courses);
                user.courses = courses;
                dispatch({
                  type: InterfaceActionTypes.LOGIN_SUBMIT,
                  user
                });
              });
          } else {
            user.admin = false;
          }
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
export const checkTotal = () => {
  return {
    type: InterfaceActionTypes.CHECK_TOTAL,
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
export const addTest = (e) => {
  e.preventDefault();
  return {
    type: InterfaceActionTypes.ADD_TEST,
  };
};

export const adminAddTest = () => {
  return {
    type: InterfaceActionTypes.ADMIN_TEST_ADD,
  };
};
export const adminCourseSelect = (e,cID) => {
  e.preventDefault();
  return {
    type: InterfaceActionTypes.SELECT_COURSE,
    cID
  };
};
export const adminTestSelect = (e,tID) => {
  e.preventDefault();
  return {
    type: InterfaceActionTypes.SELECT_TEST,
    tID
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
} else if(type === "confirmPassword") {
 return {
   type: InterfaceActionTypes.EDIT_CONFIRM_PASSWORD,
   value: e.target.value
 };
} else if(type.includes("course-")) {
  return {
    type: InterfaceActionTypes.TYPING_COURSE,
    value: e.target.value,
    propertyType: type
  };
} else if(type.includes("test-")) {
  return {
    type: InterfaceActionTypes.TYPING_TEST,
    value: e.target.value,
    propertyType: type
  };
} else if(type.includes("post-")) {
  return {
    type: InterfaceActionTypes.TYPING_POST,
    value: e.target.value,
    propertyType: type
  };
} else if(type.includes("coupon-")) {
   return {
     type: InterfaceActionTypes.TYPING_COUPON,
     value: e.target.value,
     propertyType: type
   };
} else if(type.includes("ad-")) {
   return {
     type: InterfaceActionTypes.TYPING_AD,
     value: e.target.value,
     propertyType: type
   };
} else if(type === "coupon") {
     return {
       type: InterfaceActionTypes.TYPING_COUPON_CODE,
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


export const convertFileToCSV = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    const data = new FormData();
    let questions = [];
    data.append('file', e.target.files[0]);
    // '/files' is your node.js route that triggers our middleware
    axios.post(`${store.getState().apiUrl}convertFile`, data).then((response) => {
      console.log(response); // do something with the response
      if(Array.isArray(response.data.data)){
        response.data.data.map((test)=>{
          questions.push({
            id: test[0],
            title: test[1],
            question: test[2],
            answer1: test[3],
            answer2: test[4],
            answer3: test[5],
            answer4: test[6],
            truthyOption: test[7],
            explanation: test[8],
            selectedAnswer: 0
          })
        });
      }
      dispatch({
        type: InterfaceActionTypes.CONVERT_FILE,
        questions
      });
    });

  }
}
export const adminCourseSubmit = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    let objFull = store.getState().newCourse;
    let objMin = { id:objFull.id, name:objFull.name, testCount: objFull.tests.length, price:objFull.price, currency:objFull.currency, availability:objFull.availability, duration:objFull.duration, mcqQuantity:objFull.mcqQuantity, inCart:objFull.inCart, path:objFull.path, imgSrc:objFull.imgSrc};
    axios
      .post(`${store.getState().apiUrl}saveCourse`, {
        data: JSON.stringify({
          objMin,
          objFull
        })
      })
      .then(response => {
        console.log(response);

        dispatch({
          type: InterfaceActionTypes.SAVE_COURSE,
          success: response.data.success
        });
      });

  }
}
export const adminUpdateCourseSubmit = (e) => {
  e.preventDefault();
  return function action(dispatch) {
    let objFull = store.getState().newCourse;
    let objMin = { id:objFull.id, name:objFull.name, price:objFull.price, testCount: objFull.tests.length, currency:objFull.currency, availability:objFull.availability, duration:objFull.duration, mcqQuantity:objFull.mcqQuantity, inCart:objFull.inCart, path:objFull.path, imgSrc:objFull.imgSrc};
    let id = objFull.id;
    let userIds = [];
    let userCoursesObj = [];
    let userCourses = [];
    store.getState().users.map((user)=>{
      user.courses.map((course)=>{
        if(parseInt(course.id) === id){
          userIds.push(parseInt(user.id));
          course = objFull;
        }
      });
    });
    store.getState().users.map((user)=>{
      if(userIds.includes(parseInt(user.id))) {
        user.courses.map((course)=>{
          userCoursesObj.push({id:parseInt(course.id), objFull:course});
        });
        userCourses.push(userCoursesObj);
        userCoursesObj = [];
      }
    });
    console.log(userIds);
    console.log(userCourses);
    axios
      .post(`${store.getState().apiUrl}updateCourse`, {
        data: JSON.stringify({
          id,
          userIds,
          userCourses,
          objMin,
          objFull
        })
      })
      .then(response => {
        console.log(response);

        dispatch({
          type: InterfaceActionTypes.UPDATE_COURSE,
          success: response.data.success
        });
      });

  }
}

export const adminDeleteCourseSubmit = (e,cID) => {
  e.preventDefault();
  console.log(cID);
  return function action(dispatch) {
    let userIds = [];
    let userCoursesObj = [];
    let userCourses = [];
    store.getState().users.map((user)=>{
      user.courses.map((course)=>{
        if(parseInt(course.id) === parseInt(cID)){
          userIds.push(parseInt(user.id));
        }
      });
    });
    store.getState().users.map((user)=>{
      if(userIds.includes(parseInt(user.id))) {
        user.courses.map((course)=>{
          if(parseInt(course.id) !== parseInt(cID)){
            userCoursesObj.push({id:parseInt(course.id), objFull:course});
          }
        });
        userCourses.push(userCoursesObj);
      }
    });
    console.log(userIds);
    console.log(userCourses);
    axios
      .post(`${store.getState().apiUrl}deleteCourse`, {
        data: JSON.stringify({
          cID,
          userIds,
          userCourses,
        })
      })
      .then(response => {
        console.log(response);

        dispatch({
          type: InterfaceActionTypes.DELETE_COURSE,
          success: response.data.success
        });
      });

  }
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
