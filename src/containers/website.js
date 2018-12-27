import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Courses from '../components/Courses';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

class Website extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Route exact path="/" render={Home} />
          <Route exact path="/courses" render={Courses} />
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
