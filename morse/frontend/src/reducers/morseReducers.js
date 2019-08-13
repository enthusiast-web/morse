const initialState = {
  audioCtx: new (window.AudioContext || window.webkitAudioContext)(),

  start: 0,
  end: "",
  space: "",
  lista: [],
  oscillator: "",
  letras: {
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
  },
  translate: "",
  //   feedback live , tem q ser separado do resto da traduçao, para os espaços serem certos
  //  e o feedback ao vivo tbm
  control: [],
  trans_control: ""
};

// IMPORTANTE : espaço entre letras=450 ,entre palavras =1050,tempo do ponto =150 da barra 300
export default function(state = initialState, action, dispatch) {
  switch (action.type) {
    case "CREATE_CTX":
      var audioCtx = state.audioCtx;
      var oscillator = audioCtx.createOscillator();

      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
      oscillator.start();

      return { ...state, oscillator: oscillator };
    //conecta o oscilator ao audixo.ctx.destination
    case "DEF_HIGH":
      var oscillator = state.oscillator;
      oscillator.connect(state.audioCtx.destination);
      // vendo o espaçamento
      var space = "";
      var start = Date.now();

      if (start - state.end >= 1050) {
        var space = "word";
      } else {
        if (start - state.end >= 450) {
          var space = "letter";
        }
      }

      return { ...state, oscillator: oscillator, start: start, space: space };

    //desconecta o oscilator ao audixo.ctx.destination
    case "DEF_LOW":
      var oscillator = state.oscillator;
      oscillator.disconnect(state.audioCtx.destination);
      var end = Date.now();
      // antigo "DEF_SIZE"
      // define se é . ou -  e coloca os espaços de palavra ,letra e entre .e _ das letras
      if (end - state.start >= 150) {
        if (state.space === "word") {
          var lista = ["|", " ", "-"];
        } else if (state.space === "letter") {
          var lista = [" ", "-"];
        } else {
          var lista = ["-"];
        }
      } else {
        if (state.space === "word") {
          var lista = ["|", " ", "."];
        } else if (state.space === "letter") {
          var lista = [" ", "."];
        } else {
          var lista = ["."];
        }
      }
      // utiliza a informaçdo do state e dps o zera
      // olha a lista de . e - e traduz para letras baseado no obj json do state

      var changed_list = lista.map(obj => obj.replace(/\s/g, ""));
      var index = [];
      var control = state.control;
      var translate = "";
      changed_list.map((obj, ind) => {
        if (obj !== "|" && obj !== "") {
          control.push(obj);
        }

        if (obj === "") {
          index.push(control), (control = []);
        }
      });
      console.log(control);
      // index = index.slice(1, index.length + 1);
      // converte uma array  de ['.','.','.'] para ['...']

      index = index.map(obj =>
        obj
          //   .join()
          //   .split(",")
          .join("")
      );
      //   console.log(index);

      index.map(obj => {
        for (var i in state.letras) {
          if (obj === state.letras[i]) {
            if (state.space === "word") {
              translate = translate.concat(i, " ");
            } else {
              translate = translate.concat(i);
            }
          }
        }
      });
      //   translate control
      var trans_control = "";

      for (var i in state.letras) {
        if (control.join("") === state.letras[i]) {
          if (state.space === "word") {
            trans_control = trans_control.concat(i, " ");
          } else {
            trans_control = trans_control.concat(i);
          }
        }
      }
      return {
        ...state,
        oscillator: oscillator,
        end: Date.now(),
        start: 0,
        lista: [...state.lista, lista],
        space: "",
        translate: [...state.translate, translate],
        control: control,
        trans_control: trans_control
      };

    default:
      return state;
  }
}
