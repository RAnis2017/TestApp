import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Courses from '../components/Courses';
import Test from '../components/Test';
import TestReview from '../components/TestReview';
import TestReviewPdf from '../components/TestReviewPdf';
import Checkout from '../components/Checkout';
import Cart from '../components/Cart';
import ResetPassword from '../components/ResetPassword';
import Admin from '../components/Admin';
import { bindActionCreators } from 'redux';
import * as InterfaceActionCreators from '../actions/interface';

import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';

class Website extends Component {
  constructor(props) {
      super(props);
      this.state = {
        currentTab: 4,
        currentAdminTab: 1,
        path: "",
        style: "Light",
        styleVar: "../css/style-light.css",
        loggedIn: (localStorage.getItem('genhex-auth-token') != null) ? true : true,
        signOut: null,
      }
   }
  componentWillMount(){
    const { dispatch, loggedIn } = this.props;
    const coursesMinGet = bindActionCreators(InterfaceActionCreators.coursesMinGet, dispatch);
    const loadLoggedInUser = bindActionCreators(InterfaceActionCreators.loadLoggedInUser, dispatch);
    const loadUsers = bindActionCreators(InterfaceActionCreators.usersListGet, dispatch);
    const loadPosts = bindActionCreators(InterfaceActionCreators.loadPosts, dispatch);
    const signOut = bindActionCreators(InterfaceActionCreators.signOut, dispatch);

    loadLoggedInUser();
    coursesMinGet();
    loadUsers();
    loadPosts();
    this.setState({...this.state, signOut: signOut});
  }
  handleStyleButtonClick = () => {
      if(this.state.style == "Light") {
        this.setState({...this.state, style: 'Night', styleVar: "../css/style-night.css"});
        console.log("Night");
      } else {
        this.setState({...this.state, style: 'Light', styleVar: "../css/style-light.css"});
        console.log("Light");
      }
  }
  changeTab = (type,path = null) => {
    let currentTab;
    if(type === "courses") {
      this.setState({...this.state, currentTab: 1});
    } else if (type === "performance") {
      this.setState({...this.state, currentTab: 2});
    } else if (type === "settings") {
      this.setState({...this.state, currentTab: 3});
    } else if (type === "dashboard") {
      this.setState({...this.state, currentTab: 4});
    } else if (type === "tests") {
      this.setState({...this.state, currentTab: 5, path: path});
    } else if (type === "posts") {
      this.setState({...this.state, currentTab: 6});
    }
  }
  changeAdminTab = (type,path = null) => {
    let currentTab;
    if(type === "add-courses") {
      this.setState({...this.state, currentAdminTab: 1});
    } else if (type === "edit-courses") {
      this.setState({...this.state, currentAdminTab: 2});
    } else if (type === "add-posts") {
      this.setState({...this.state, currentAdminTab: 3});
    }  else if (type === "add-coupons") {
      this.setState({...this.state, currentAdminTab: 4});
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <link href={`${this.state.styleVar}`} rel="stylesheet" />
          <Route path="/" render={(props) => <Header {...props}/>}/>
          <Route exact path="/" render={Home} />
          <Route exact path="/courses" render={Courses} />
          <Route path="/courses/:path" component={Test} />
          <Route path="/testreview/:path" component={TestReview} />
          <Route path="/testreviewpdf/:path" component={TestReviewPdf} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/cart" component={Cart} />
          <Route path="/password-reset/:token" component={ResetPassword} />
          <Route path="/profile"  render={(props) => (this.state.loggedIn) ? <Profile {...props} signOut={this.state.signOut} changeTab={this.changeTab} currentTab={this.state.currentTab} path={this.state.path} theme={this.handleStyleButtonClick} currentTheme={this.state.style}/> : <Redirect to="/"/>}/>
          <Route path="/admin"  render={(props) => <Admin {...props} signOut={this.state.signOut} changeTab={this.changeAdminTab} currentTab={this.state.currentAdminTab} theme={this.handleStyleButtonClick} currentTheme={this.state.style}/>}/>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => (
  {
    loggedInUser: state.loggedInUser,
  }
);

export default connect(mapStateToProps)(Website);
