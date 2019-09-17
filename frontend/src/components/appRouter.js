import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
export default function appRouter() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Router style={{ height: "100%", width: "100%" }}>
        <Route exact path="/" component={Main}></Route>
        {/* nested routing ,dentro de header tem todos os outro componentes,
         */}
        <Route path="/(learn|morse|lang)/" component={Header} />
      </Router>
    </div>
  );
}
