import React, { Component } from "react";
import { Provider } from "react-redux";
import {store} from './Store';
import WebsiteComponent from "./containers/website";

class App extends Component {
  render() {
    return <Provider store={store}> <WebsiteComponent /> </Provider>;
  }
}

export default App;
