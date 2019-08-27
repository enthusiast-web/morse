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
  state = {
    iniciado: false
  };
  componentDidMount() {
    var element = document.getElementById("click");
    element.addEventListener("mouseup", this.upHandler);
    element.addEventListener("mousedown", this.pressHandler);
    element.addEventListener("touchend", this.upHandler);
    element.addEventListener("touchstart", this.pressHandler);
    window.addEventListener("keypress", this.pressHandler);
    window.addEventListener("keyup", this.upHandler);

    // this.props.resetLista();
  }

  upHandler = e => {
     this.setState({ iniciado: true });
    if (e) {
      e.preventDefault();
      console.log(e);
      if (e.key !== "Tab" && e.key !== "Alt" && !/^[0-9]$/i.test(e.key)) {
        setTimeout(() => this.props.defLow(), 50);
      }
    } else {
      setTimeout(() => this.props.defLow(), 10);
    }
  };
  pressHandler = e => {
     this.setState({ iniciado: true });
    if (e) {
      e.preventDefault();
      console.log(e.key);
      if (e.key !== "Tab" && e.key !== "Alt" && !/^[0-9]$/i.test(e.key)) {
        // impede o evento de dar trigger em defHIgh se a tleca ja tiver sido apertada
        // o evento defLow usa os dados do start e o define como 0 novamente
        if (this.props.morse.start === 0) {
          this.props.defHigh();
        }
      }
    } else {
      this.props.defHigh();
    }
  };
  componentWillUnmount() {
    window.removeEventListener("keypress", this.pressHandler);
    window.removeEventListener("keyup", this.upHandler);
    var element = document.getElementById("click");

    element.removeEventListener("mouseup", this.upHandler);
    element.removeEventListener("mousedown", this.pressHandler);
    element.removeEventListener("touchend", this.upHandler);
    element.removeEventListener("touchstart", this.pressHandler);
  }
  coverDisplay = () => {
    console.log(this.state.iniciado);
    if (this.state.iniciado) {
      return "none";
    }
    return "block";
  };
  render() {
    return (
      <div>
        <div style={{ width: "100%", fontSize: "20px" }}>
          clique na caixa ou aperte qualquer tecla para começar
        </div>
        <div style={{ width: "100%", minHeight: 300, border: "1px solid black",position:'relative' }}>
          <div
          style={{ width: "100%", height:"100%",
        minHeight: 300,position:"absolute",top:0}}
            id="click"
          >
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
          <div
            onClick={() => {
              this.setState({ iniciado: true });
            }}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 300,
              position:"absolute",
            
              top:0,
              background: "gray",
              opacity: 1,
              display: this.coverDisplay(),
             
            }}
          ></div>
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
  { defHigh, defLow, createCTX, resetLista, setContext, setPage, resetLista }
)(Morse);
