import React, { Component } from "react";
import Volume from "./Volume";
import {
  defHigh,
  defLow,
  createCTX,
  resetLista,
  setContext,
  setPage
} from "../actions/morseActions";
import { connect } from "react-redux";
import Speed from "./Speed";
class Morse extends Component {
  constructor() {
    super();
    // criando a referencia pra adicionar e remover o eventelistener
    this.upHandler = this.upHandler.bind(this);
    this.pressHandler = this.pressHandler.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keypress", this.pressHandler);
    window.addEventListener("keyup", this.upHandler);

    // this.props.resetLista();
  }

  upHandler = e => {
    if (e.key !== "Tab" && e.key !== "Alt" && !/^[0-9]$/i.test(e.key)) {
      setTimeout(() => this.props.defLow(), 50);
    }
  };
  pressHandler = e => {
    if (e.key !== "Tab" && e.key !== "Alt" && !/^[0-9]$/i.test(e.key)) {
      // impede o evento de dar trigger em defHIgh se a tleca ja tiver sido apertada
      // o evento defLow usa os dados do start e o define como 0 novamente
      if (this.props.morse.start === 0) {
        this.props.defHigh();
      }
    }
  };
  componentWillUnmount() {
    console.log("abc");
    window.removeEventListener("keypress", this.pressHandler);
    window.removeEventListener("keyup", this.upHandler);
  }

  render() {
    return (
      <div>
        <div
          style={{ width: "100%", fontSize: "35px" }}
          onClick={() => {
            this.props.createCTX();
          }}
        >
          realize o codigo morse com a barra de espaço
        </div>
        <div style={{ width: "100%", minHeight: 300 }}>
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
        {/* <Volume />
        <Speed /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  morse: state.morseReducers
});

export default connect(
  mapStateToProps,
  { defHigh, defLow, createCTX, resetLista, setContext, setPage, resetLista }
)(Morse);
