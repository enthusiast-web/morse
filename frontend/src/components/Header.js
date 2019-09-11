import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Speed from "./Speed";
import Volume from "./Volume";
import Morse from "./Morse";
import LangToMorse from "./LangToMorse";
import LearnMorse from "./LearnMorse";
import SvgIcon from "@material-ui/core/SvgIcon";

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
                <Link className="nav-link" to="/learn">
                  Aprenda Morse
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/morse/">
                  Escreva morse
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lang/">
                  Traduza para morse
                </Link>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a
                  target="_blank"
                  class="nav-link"
                  href="https://github.com/enthusiast-web/morse"
                >
                  <div className="d-flex">
                    <SvgIcon
                      style={{
                        alignContent: "center",
                        justifyContent: "middle"
                      }}
                    >
                      <path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z" />
                    </SvgIcon>{" "}
                    <p className="ml-1 "> {"  "} git</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container mx-auto">
          <div className=" mt-2 pb-2 col-sm">
            <div className="col-sm">
              <div className="row">
                <div className="col-sm">
                  <Route path="/(learn|morse|lang)/" component={Volume} />
                </div>
                <div className="col-sm">
                  <Route path="/(learn|morse|lang)/" component={Speed} />
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
