import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Speed from "./Speed";
import Volume from "./Volume";
import Morse from "./Morse";
import LangToMorse from "./LangToMorse";
import LearnMorse from "./LearnMorse";

export default function appRouter() {
  const style = {
    minWidth: "30%",
    heigth: "100%",

    position: "absolute"
  };
  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">Morse.js</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                {/* <a className="nav-link"> */}
                <Link className="nav-link" to="/learn">
                  Aprenda Morse
                </Link>
                {/* </a> */}
              </li>
              <li className="nav-item">
                {/* <a className="nav-link"> */}
                <Link className="nav-link" to="/morse/">
                  Escreva morse
                </Link>
                {/* </a> */}
              </li>
              <li className="nav-item">
                {/* <a className="nav-link"> */}
                <Link className="nav-link" to="/lang/">
                  Traduza para morse
                </Link>
                {/* </a> */}
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <div className="container mx-auto">
          <div className=" mt-2 pb-2 col-sm">
            <div className="col-sm">
              <div className="row">
                <div className="col-sm">
                  <Volume />
                </div>
                <div className="col-sm">
                  <Speed />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="col-sm">
              <Route path="/learn/" component={LearnMorse} />
              <Route path="/morse/" component={Morse} />
              <Route path="/lang/" component={LangToMorse} />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}
