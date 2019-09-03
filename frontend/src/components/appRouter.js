import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Speed from "./Speed";
import Volume from "./Volume";
import Morse from "./Morse";
import LangToMorse from "./LangToMorse";
import LearnMorse from "./LearnMorse";
import SvgIcon from "@material-ui/core/SvgIcon";
import Header from "./Header";
import Main from "./Main";
export default function appRouter() {
  const style = {
    minWidth: "30%",
    heigth: "100%",

    position: "absolute"
  };
  return (
    <div>
      <Router>
        <Route exact path="/" component={Main}></Route>
        {/* neste routing ,dentro de header tem todos os outro componentes,
         */}
        <Route path="/(learn|morse|lang)/" component={Header} />
      </Router>
    </div>
  );
}
