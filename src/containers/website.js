import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Courses from '../components/Courses';
import Test from '../components/Test';
import Checkout from '../components/Checkout';
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
        path: "",
        style: "Light",
        styleVar: "../css/style-light.css",
        loggedIn: (localStorage.getItem('genhex-auth-token') != null) ? true : true
      }
   }
  componentWillMount(){
    const { dispatch } = this.props;
    const coursesMinGet = bindActionCreators(InterfaceActionCreators.coursesMinGet, dispatch);
    const loadLoggedInUser = bindActionCreators(InterfaceActionCreators.loadLoggedInUser, dispatch);

    loadLoggedInUser();
    coursesMinGet();
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
  signOut = () => {
    localStorage.removeItem("genhex-auth-token");
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <link href={`${this.state.styleVar}`} rel="stylesheet" />
          <Header />
          <Route exact path="/" render={Home} />
          <Route exact path="/courses" render={Courses} />
          <Route path="/courses/:path" component={Test} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/profile"  render={(props) => (this.state.loggedIn) ? <Profile {...props} signOut={this.signOut} changeTab={this.changeTab} currentTab={this.state.currentTab} path={this.state.path} theme={this.handleStyleButtonClick} currentTheme={this.state.style}/> : <Redirect to="/"/>}/>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => (
  {

  }
);

export default connect(mapStateToProps)(Website);
