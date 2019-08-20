import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeSpeed,
  defHigh,
  defLow,
  createCTX
} from "../actions/morseActions";

class langToMorse extends Component {
  state = {
    texto: "",
    lista: [],
    total: 0,
    lista_normal: [],
    morse: "",
    morseTraduzido: []
  };
  // componentDidMount() {
  //   this.dot = this.dot.bind(this);
  //   window.addEventListener("keypress", this.dot);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("keypress", this.dot);
  // }
  // dot = e => {
  //   console.log(this.state.morse);
  //   if (e.key === ".") {
  //     this.setState({ morse: this.state.morse.concat(".") });
  //   }
  //   if (e.key === " ") {
  //     this.setState({ morse: this.state.morse.concat(" ") });
  //   }
  //   if (e.key === "-") {
  //     this.setState({ morse: this.state.morse.concat("-") });
  //   }
  //   var ms = this.state.morse.split(" ");
  //   this.setState({ morseTraduzido: "" }, () =>
  //     ms.map(obj => {
  //       for (var i in this.props.morse.letras) {
  //         if (obj === this.props.morse.letras[i]) {
  //           this.setState({
  //             morseTraduzido: this.state.morseTraduzido.concat(i)
  //           });
  //         }
  //       }
  //     })
  //   );
  // };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.morseTolang();
    // esta retorando uma array pq dois metodos utilizam esse return
    // e como está direto no render nao pode mexer no state
  };
  ChangeLista = () => {
    var lista = [];
    var lista_normal = [];
    [...this.state.texto].map((obj, ind) => {
      if (obj === " ") {
        lista_normal = [...lista_normal, " / "];
        lista = [...lista, ["  /  "]];
      }
      for (var i in this.props.morse.letras) {
        if (obj === i) {
          lista_normal = [...lista_normal, " ", this.props.morse.letras[i]];
          lista = [...lista, ["  " + this.props.morse.letras[i], " " + i]];
        }
      }
    });
    // console.log(lista_normal);
    return [lista_normal, lista];
  };
  morseTolang = () => {
    var ms = this.state.morse.split(" ");
    var toReturn = [];
    console.log(ms);
    console.log(this.state.morse);
    ms.map(obj => {
      for (var i in this.props.morse.letras) {
        if (obj === this.props.morse.letras[i]) {
          toReturn.push(i);
        } else {
          if (obj === "") {
            toReturn.push(" ");
          }
        }
      }
    });

    return toReturn;
  };

  play = () => {
    var lista = this.ChangeLista()[0];

    lista = lista.map(obj => obj.split(""));
    lista = lista.join(",");
    var total = 0;
    console.log(this.props.morse.end, Date.now());

    if (this.state.total === 0) {
      // this.props.createCTX();

      [...lista].map((obj, ind) => {
        if (obj === "-") {
          setTimeout(() => {
            this.props.defHigh();
          }, total);
          setTimeout(() => {
            this.props.defLow();
          }, total + Number(this.props.morse.speed) * 3);
          total += Number(this.props.morse.speed) * 3;
        }
        if (obj === ".") {
          setTimeout(() => {
            this.props.defHigh();
          }, total);
          setTimeout(() => {
            this.props.defLow();
          }, total + Number(this.props.morse.speed));
          total += Number(this.props.morse.speed);
        }
        if (obj === " ") {
          total += Number(this.props.morse.speed) * 1;
        }

        if (obj === ",") {
          total += Number(this.props.morse.speed) * 1;
        }
        this.setState({ total: total });
      });
      // limita o numero de veze que da pra rodar esse metodo
      setTimeout(() => {
        this.setState({ total: 0 });
      }, total);
    }
  };

  getColor = ind => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor((ind * i * 13) % 16)];
    }
    return color;
  };
  render() {
    return (
      <div className="container mx-auto">
        <div className="row">
          <div className="col-sm" style={{ width: 300, height: 100 }}>
            <input
              onChange={this.onChange}
              name="texto"
              value={this.state.texto}
              style={{ width: "100%", height: "100%" }}
              placeholder="digite aqui em letras"
              type="text"
            />
            <div>
              <button onClick={() => this.play()}> play</button>
            </div>
            <div className="d-flex">
              {this.ChangeLista()[1].map((obj, ind) => (
                <div
                  key={ind}
                  style={{
                    margin: "0px 0px 0px 10px",
                    fontSize: "25px",
                    color: this.getColor(ind)
                  }}
                >
                  <p style={{ textAlign: "center", marginBottom: 0 }}>
                    {obj[1]}
                  </p>
                  <p style={{ textAlign: "center", marginBottom: 0 }}>
                    {obj[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-sm" style={{ width: 300, height: 100 }}>
            <input
              onChange={this.onChange}
              name="morse"
              value={this.state.morse}
              style={{ width: "100%", height: "100%" }}
              placeholder="digite aqui em codigo morse ,ex: ..- ..-"
              type="text"
            />
            <p style={{ fontSize: 25 }}>{this.morseTolang().map(obj => obj)}</p>
          </div>
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
  { changeSpeed, defHigh, defLow, createCTX }
)(langToMorse);
