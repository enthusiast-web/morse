import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSpeed } from "../actions/uiActions";

class langToMorse extends Component {
  state = {
    texto: "",
    lista: []
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  ChangeLista = () => {
    var lista = [];
    [...this.state.texto].map((obj, ind) => {
      if (obj === " ") {
        lista = [...lista, " | "];
      }
      for (var i in this.props.morse.letras) {
        if (obj === i) {
          lista = [...lista, " ", this.props.morse.letras[i]];
        }
      }
    });

    return lista;
  };
  play = () => {
    var lista = this.ChangeLista();
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
    oscillator.start();
    lista = lista.map(obj => obj.split(""));
    lista = lista.join(",");

    [...lista].map((obj, ind) => {
      setTimeout(() => {
        if (obj === "-") {
          oscillator.connect(audioCtx.destination);
          setTimeout(() => {
            oscillator.disconnect(audioCtx.destination);
          }, this.props.ui.speed * 3);
        } else if (obj === ".") {
          oscillator.connect(audioCtx.destination);
          setTimeout(() => {
            oscillator.disconnect(audioCtx.destination);
          }, this.props.ui.speed);
        }
      }, ind * this.props.ui.speed * 3);
    });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(e.target.number.value);
    this.props.changeSpeed(e.target.number.value);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="number" name="number" />
          <input type="submit" />
        </form>

        <div style={{ width: 300, height: 100 }}>
          <input
            onChange={this.onChange}
            name="texto"
            value={this.state.texto}
            style={{ width: "100%", height: "100%" }}
            type="text"
          />
        </div>
        <div style={{ fontSize: "40px" }}>{this.ChangeLista()}</div>

        <button onClick={() => this.play()}> play</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  morse: state.morseReducers,
  ui: state.uiReducers
});

export default connect(
  mapStateToProps,
  { changeSpeed }
)(langToMorse);