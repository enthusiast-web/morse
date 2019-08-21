import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeSpeed,
  defHigh,
  defLow,
  createCTX
} from "../actions/morseActions";
import Icon from "@material-ui/core/Icon";
class langToMorse extends Component {
  state = {
    texto: "",
    lista: [],
    total: 0,
    lista_normal: [],
    morse: "",
    morseTraduzido: [],
    display: true
  };

  componentDidMount() {
    this.display = this.display.bind(this);
    this.update = this.update.bind(this);
    window.addEventListener("resize", this.display);
    window.addEventListener("resize", this.update);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.display);
    window.removeEventListener("resize", this.update);
    
  }
  // isso funciona para força o rerender :( 
  update = () => {
    this.setState({ state: this.state });
  };
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

    ms.map(obj => {
      for (var i in this.props.morse.letras) {
        if (obj === this.props.morse.letras[i]) {
          toReturn.push([i, obj]);
        } else {
          if (obj === "") {
            toReturn.push([" ", ""]);
            break;
          }
        }
      }
    });

    return toReturn;
  };
  //o arg serve pra decidir se vai dar play
  // na traduçao ou no codigo morse direto

  play = arg => {
    if (arg) {
      var lista = this.state.morse.split("");
      lista = lista.join(",");
    } else {
      var lista = this.ChangeLista()[0];
      lista = lista.map(obj => obj.split(""));
      lista = lista.join(",");
    }

    var total = 0;

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
  // mostra os dois inputs se for na tela grande
  // caso contrario mostra o botao de switch
  // functional style
  display = () => {
    if (window.innerWidth < 999) {
      if (this.state.display) {
        return ["none", "block", "linguagem", "morse"];
      } else {
        return ["block", "none", "morse", "linguagem "];
      }
    } else return ["block", "block", "", ""];
  };
  render() {
    return (
      <div className="container m-0">
        <div className="row">
          <div className="d-xl-none d-lg-none container   m-0 p-0">
            <div className="row  no-gutters">
              <div className="col-sm">{this.display()[2]}</div>

              <Icon
                className="col-sm"
                fontSize="large"
                onClick={() => {
                  this.setState({ display: !this.state.display });
                }}
              >
                compare_arrows
              </Icon>
              <div className="col-sm">{this.display()[3]}</div>
            </div>
          </div>
          <div
            className="col-sm m-0 p-0"
            style={{ maxWidth: 500, height: 100, display: this.display()[1] }}
          >
            <input
              className="col-sm"
              onChange={this.onChange}
              name="texto"
              value={this.state.texto}
              style={{ width: "100%", height: "100%" }}
              placeholder="digite aqui em letras"
              type="text"
            />
            <div>
              <Icon fontSize="large" onClick={() => this.play()}>
                play_arrow
              </Icon>
            </div>
            <div
              className="container"
              style={{
                maxWidth: 500,
                // border: "1px solid black",
                height: "auto",
                padding: 0,
                margin: 0
              }}
            >
              <div className="row no-gutters ">
                {this.ChangeLista()[1].map((obj, ind) => {
                  if (obj !== "") {
                    return (
                      <div
                        className="col-1"
                        key={ind}
                        style={{
                          height: "auto",
                          margin: "0px 0px 0px 5px",
                          fontSize: "20px",
                          color: this.getColor(ind),
                          paddingRight: 10,
                          margin: 0,
                          borderBottom: "1px solid black"
                        }}
                      >
                        <p
                          style={{
                            whiteSpace: "normal",
                            width: 40,
                            textAlign: "center",
                            marginBottom: 0,
                            padding: 0,
                            margin: 0
                          }}
                        >
                          {obj[1]}
                        </p>
                        <p
                          style={{
                            whiteSpace: "normal",
                            width: 40,
                            textAlign: "center",
                            marginBottom: 0,
                            padding: 0,
                            margin: 0
                          }}
                        >
                          {obj[0]}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div
            className="col-sm  m-0 p-0"
            style={{ maxWidth: 500, height: 100, display: this.display()[0] }}
          >
            <input
              className="col-sm"
              onChange={this.onChange}
              name="morse"
              value={this.state.morse}
              style={{ width: "100%", height: "100%" }}
              placeholder="digite aqui em codigo morse ,ex: ..- ..-"
              type="text"
            />
            <div className="m-0 p-0">
              <Icon fontSize="large" onClick={() => this.play("arg")}>
                play_arrow
              </Icon>
            </div>
            <div className="container m-0 p-0" style={{ maxWidth: 500 }}>
              <div className="row no-gutters ">
                {this.morseTolang().map((obj, ind) => {
                  if (obj[1] !== "") {
                    return (
                      <div
                        key={ind}
                        style={{
                          margin: "0px 0px 0px 10px",
                          fontSize: "20px",
                          color: this.getColor(ind),
                          borderBottom: "1px solid black",
                          marginBottom: 0,
                          paddingRight: 10,
                          margin: 0
                        }}
                      >
                        <p
                          style={{
                            whiteSpace: "normal",
                            width: 40,
                            textAlign: "center",
                            marginBottom: 0,
                            padding: 0,
                            margin: 0
                          }}
                        >
                          {obj[1]}
                        </p>
                        <p
                          style={{
                            whiteSpace: "normal",
                            width: 40,
                            textAlign: "center",
                            marginBottom: 0,
                            padding: 0,
                            margin: 0
                          }}
                        >
                          {obj[0]}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
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
