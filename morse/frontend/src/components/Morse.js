import React, { Component } from "react";
import { object } from "prop-types";
import { defHigh, defLow, createCTX } from "../actions/morseActions";
import { connect } from "react-redux";
class Morse extends Component {
  componentDidMount() {
    console.log(this.props.morse);

    document.addEventListener("keypress", e => {
      if (e.key !== "Tab" && e.key !== "Alt") {
        // o audioCTX é criado somente se o no state do redux audio ctx for null (!audioCtx)
        if (!this.props.morse.oscillator) {
          this.props.createCTX();
        }
        // impede o evento de dar trigger em defHIgh se a telca ja tiver sido apertada
        // o evento defLow usa os dados do start e o define como 0 novamente
        if (this.props.morse.start === 0) {
          this.props.defHigh();
        }
      }
    });
    document.addEventListener("keyup", () => {
      setTimeout(() => this.props.defLow(), 50);
    });
  }

  render() {
    return (
      <div>
        <div
          style={{ width: "100px" }}
          onClick={() => {
            this.props.createCTX();
          }}
        >
          realize o codigo morse com a barra de espaço
        </div>
        <div>
          <p style={{ fontSize: 55 }}>{this.props.morse.lista}</p>
        </div>
        <div>
          <p style={{ fontSize: 55 }}>
            {this.props.morse.translate}
            {this.props.morse.trans_control}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  morse: state.morseReducers
});

export default connect(
  mapStateToProps,
  { defHigh, defLow, createCTX }
)(Morse);
