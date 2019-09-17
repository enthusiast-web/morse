import React, { Component } from "react";

import Icon from "@material-ui/core/Icon";
export default class Main extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",

          opacity: "1",
          backgroundImage: `linear-gradient(to bottom,rgba(219, 219, 219, 1) 0%,rgba(219, 219, 219, 0.7) 20%,rgba(219, 219, 219, 0.3) 100%)`,

          // background: `url(${"../../static/untitled.svg"})`,
          backgroundRepeat: "initial"
        }}
      >
        <div
          className="d-flex  flex-column flex-md-row flex-sm-row"
          style={{
            fontSize: 30
          }}
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
          <div className="justify-content-center align-items-center flex-fill m-t-10  ">
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ margin: "auto" }}
            >
              <div className="p-2">
                <a class="nav-link" href="/learn">
                  Aprenda morse
                </a>
              </div>
              <div className="p-2 d-flex" style={{ fontSize: 25 }}>
                <a class="nav-link" href="/lang">
                  Traduza
                </a>
                <Icon>subtitles</Icon>
              </div>
              <div className="p-2">
                <a class="nav-link" href="/morse">
                  Escreva
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
