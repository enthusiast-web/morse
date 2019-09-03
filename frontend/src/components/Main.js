import React, { Component } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
export default class Main extends Component {
  render() {
    return (
      <div
        className="d-flex  flex-column flex-md-row flex-sm-row"
        style={{ fontSize: 30 }}
      >
        <div className="p-2 ">
          <div className="d-flex justify-content-center align-items-start ">
            <div className="d-flex flex-column ">
              <span> MORSE.JS</span>
              <span>.--- ...</span>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column justify-content-center align-items-start ">
            <div className="p-2">Aprenda morse</div>
            <div className="p-2">Traduza</div>
            <div className="p-2">Escreva</div>
          </div>
        </div>
      </div>
    );
  }
}
