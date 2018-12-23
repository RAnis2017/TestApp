import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InterfaceActionCreators from '../actions/interface';
import Header from '../components/Header';
import Home from '../components/Home';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

class Website extends Component {

  render() {
    const { dispatch, selectedForm, email, password } = this.props;
    const changeForm = bindActionCreators(InterfaceActionCreators.changeForm, dispatch);

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
    selectedForm: state.selectedForm,
    email: state.email,
    password: state.password,
  }
);

export default connect(mapStateToProps)(Website);
