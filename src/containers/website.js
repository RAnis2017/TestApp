import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Courses from '../components/Courses';
import Test from '../components/Test';
import { bindActionCreators } from 'redux';
import * as InterfaceActionCreators from '../actions/interface';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

class Website extends Component {
  constructor(props) {
      super(props);

      this.state = {
        currentTab: 1
      }
   }
  changeTab = (type) => {
    let currentTab;
    if(type === "courses") {
      this.setState({...this.state, currentTab: 1});
    } else if (type === "performance") {
      this.setState({...this.state, currentTab: 2});
    } else if (type === "settings") {
      this.setState({...this.state, currentTab: 3});
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Route exact path="/" render={Home} />
          <Route exact path="/courses" render={Courses} />
          <Route path="/courses/:path" component={Test} />
          <Route path="/profile"  render={(props) => <Profile {...props} changeTab={this.changeTab} currentTab={this.state.currentTab} />}/>
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
