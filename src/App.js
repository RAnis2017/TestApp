import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import InterfaceReducer from "./reducers/interface";
import WebsiteComponent from "./containers/website";

const store = createStore(
  InterfaceReducer,
  window.devToolsExtension && window.devToolsExtension()
);

class App extends Component {
  render() {
    return <Provider store={store}> <WebsiteComponent /> </Provider>;
  }
}

export default App;
