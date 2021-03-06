const initialState = {
  audioCtx: new (window.AudioContext || window.webkitAudioContext)(),

  start: 0,
  end: 0,
  space: "",
  lista: [],
  oscillator: "",
  speed: 130,
  volume: 0.6,
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
    á: ".--.-",
    b: "-...",
    c: "-.-.",
    ç: "-.-..",
    d: "-..",
    e: ".",
    é: "..-..",
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
  trans_control: "",
  gain: "",
  started: false
};

// IMPORTANTE : espaço entre letras=450 ,entre palavras =1050,tempo do ponto =150 da barra 300
export default function(state = initialState, action, dispatch) {
  switch (action.type) {
    case "CHANGE_SPEED":
      if (action.payload >= 500) {
        action.payload = 500;
      }
      return {
        ...state,
        speed: action.payload
      };
    case "CHANGE_GAIN":
      return {
        ...state,
        volume: action.payload
      };
    case "RESET":
      return {
        ...state,
        trans_control: "",
        translate: "",
        control: [],
        lista: [],
        end: 0,
        start: 0
      };
    case "CREATE_CTX":
      var audioCtx = state.audioCtx;

      var gain = state.audioCtx.createGain();
      gain.gain.value = state.volume;
      gain.connect(audioCtx.destination);
      var oscillator = audioCtx.createOscillator();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(820, audioCtx.currentTime); // value in hertz
      // oscillator.start();

      return { ...state, oscillator: oscillator, gain: gain };
    //conecta o oscilator ao audixo.ctx.destination

    case "DEF_HIGH":
      var oscillator = state.oscillator;

      if (!state.started) {
        console.log(oscillator);
        oscillator.start();
      }

      state.gain.gain.value = state.volume;
      state.gain.gain.setValueAtTime(0, state.audioCtx.currentTime);
      state.gain.gain.linearRampToValueAtTime(
        state.volume,
        state.audioCtx.currentTime + 0.01
      );

      oscillator.connect(state.gain);

      // vendo o espaçamento
      var space = "";
      var start = Date.now();

      if (start - state.end >= state.speed * 7) {
        var space = "word";
      } else {
        if (start - state.end >= state.speed * 3) {
          var space = "letter";
        }
      }

      return {
        ...state,
        oscillator: oscillator,
        start: start,
        space: space,
        started: true
      };

    //desconecta o oscilator ao audixo.ctx.destination
    case "DEF_LOW":
      var oscillator = state.oscillator;
      state.gain.gain.value = state.volume;

      state.gain.gain.linearRampToValueAtTime(
        0,
        state.audioCtx.currentTime + 0.01
      );
      // ?????????????????????
      // aparentemente nao precisa disconectar o oscilato do state.gain
      // setTimeout(() => {
      //   oscillator.disconnect(state.gain);
      // }, 0.02);

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

      // index = index.slice(1, index.length + 1);
      // converte uma array  de ['.','.','.'] para ['...']

      index = index.map(obj => obj.join(""));

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
