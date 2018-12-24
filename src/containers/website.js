import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Home from '../components/Home';

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
