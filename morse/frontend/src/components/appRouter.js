import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Morse from "./Morse";
import LangToMorse from "./LangToMorse";
function traslate() {
  return <h2>traslate</h2>;
}

export default function appRouter() {
  return (
    <div>
      <Router>
        <Route path="/morse/" component={Morse} />
        <Route path="/lang/" component={LangToMorse} />
      </Router>
    </div>
  );
}
