import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";


import { Provider } from "react-redux";
import store from "../store";


import AppRouter from "./appRouter";
export class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    );
    }}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));



    


