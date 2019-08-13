import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";


import { Provider } from "react-redux";
import store from "../store";
import Morse from './Morse'
export class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>


        <Morse></Morse>

        </Provider>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));