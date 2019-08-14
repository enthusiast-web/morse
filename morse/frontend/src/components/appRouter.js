import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Speed from "./Speed";
import Volume from "./Volume";
import Morse from "./Morse";
import LangToMorse from "./LangToMorse";
import LearnMorse from "./LearnMorse";
function traslate() {
  return <h2>traslate</h2>;
}

export default function appRouter() {
  return (
    <div>
      <Volume />
      <Speed />
      <Router>
        <Route path="/learn/" component={LearnMorse} />
        <Route path="/morse/" component={Morse} />
        <Route path="/lang/" component={LangToMorse} />
      </Router>
    </div>
  );
}
