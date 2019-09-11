import React, { Component } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
export default class Main extends Component {
  render() {
    return (
      <div
        className="d-flex  flex-column flex-md-row flex-sm-row"
        style={{ fontSize: 30, width: "100%" }}
      >
        <div className="p-2 ">
          <div
            className="d-flex justify-content-center align-items-start "
            style={{ margin: "auto" }}
          >
            <div className="d-flex flex-column ">
              <span> MORSE.JS</span>
              <span>.--- ...</span>
            </div>
          </div>
        </div>
        <div className="justify-content-center align-items-center flex-fill m-t-10">
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ margin: "auto" }}
          >
            <div className="p-2">
              <a class="nav-link" href="/learn">
                Aprenda morse
              </a>
            </div>
            <div className="p-2">
              <a class="nav-link" href="/lang">
                Traduza
              </a>
            </div>
            <div className="p-2">
              <a class="nav-link" href="/morse">
                Escreva
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
