import React, { Component } from "react";

import Icon from "@material-ui/core/Icon";

export default class Main extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          // opacity: "1",
          backgroundImage: `linear-gradient(to bottom,rgba(219, 219, 219, 0.9) 0%,rgba(219, 219, 219, 0.7) 20%,rgba(219, 219, 219, 0.0) 40%)`
        }}
      >
        <div
          // className="d-flex  flex-column flex-md-row flex-sm-row"
          style={{
            fontSize: 30
          }}
        >
          <div className="p-2 ">
            <div
              className="d-flex justify-content-center align-items-start "
              style={{}}
            >
              <div
                className="d-flex flex-column "
                style={{ textAlign: "center", color: "black" }}
              >
                <span> MORSE.JS</span>
                <span>.--- ...</span>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", height: 190 }}
            className="d-sm-block d-md-block d-none"
          ></div>

          <div className=" align-items-center flex-fill m-t-10  ">
            <div
              className="d-flex flex-column  flex-md-row flex-sm-row  justify-content-around align-items-center"
              style={{ background: "#3297a8" }}
            >
              <a class="nav-link" href="/learn">
                <div className="p-2">
                  <div style={{ textAlign: "center" }}>
                    <Icon fontSize="large">book</Icon>
                  </div>

                  <p>Aprenda</p>
                </div>
              </a>
              <a class="nav-link" href="/lang">
                <div className="p-2 d-flex-column">
                  <div style={{ textAlign: "center" }}>
                    <Icon fontSize="large">subtitles</Icon>
                  </div>

                  <p>Traduza</p>
                </div>
              </a>
              <a class="nav-link" href="/morse">
                <div className="p-2">
                  <div style={{ textAlign: "center" }}>
                    <Icon fontSize="large">create</Icon>
                  </div>
                  <p>Escreva</p>
                </div>
              </a>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: 173,
              background: ` #3297a8`
            }}
            className="d-sm-block d-md-block d-none"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `linear-gradient(to bottom, 0%,rgba(219, 219, 219, 0.7) 20%,rgba(219, 219, 219, 0.3) 100%)`,
                background: "url(../static/untitled.svg)",
                opacity: "0.5"
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
