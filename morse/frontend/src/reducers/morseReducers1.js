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
  translate: ""
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
          var lista = [...state.lista, "|", " ", "-"];
        } else if (state.space === "letter") {
          var lista = [...state.lista, " ", "-"];
        } else {
          var lista = [...state.lista, "-"];
        }
      } else {
        if (state.space === "word") {
          var lista = [...state.lista, "|", " ", "."];
        } else if (state.space === "letter") {
          var lista = [...state.lista, " ", "."];
        } else {
          var lista = [...state.lista, "."];
        }
      }
      // utiliza a informaçdo do state e dps o zera
      // olha a lista de . e - e traduz para letras baseado no obj json do state

      var changed_list = lista.map(obj => obj.replace(/\s/g, ""));
      var index = [];
      var control = [];
      var translate = "";
      changed_list.map((obj, ind) => {
        if (obj !== "|" && obj !== "") {
          control.push(obj);
        }
        if (obj === "" || ind === changed_list.length - 1) {
          index.push(control), (control = []);
        }
      });
      index = index.slice(1, index.length + 1);
      // converte uma array  de ['.','.','.'] para ['...']

      index = index.map(obj =>
        obj
          //   .join()
          //   .split(",")
          .join("")
      );

      index.map(obj => {
        for (var i in state.letras) {
          if (obj === state.letras[i]) {
            if (state.space === "word") {
              translate = translate.concat(" ", i);
            } else {
              translate = translate.concat(i);
            }
          }
        }
      });

      return {
        ...state,
        oscillator: oscillator,
        end: Date.now(),
        start: 0,
        lista: lista,
        space: "",
        translate: translate
      };

    default:
      return state;
  }
}
// defHigh=()=>{
//     // cria um audio cntx e gera o espaço entre palavras ou letras baseado no tempo do final da ultima letra
//     var audioCtx = this.audioCtx

//     var oscillator = audioCtx.createOscillator();

//     oscillator.type = 'square';
//     oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
//     oscillator.connect(audioCtx.destination);
//     oscillator.start();
//     this.setState({start:Date.now()})
//     if (this.state.start- this.state.end >1050){
//         this.setState({space:'word'})

//     }
//     else{
//         if(this.state.start- this.state.end >450){
//             this.setState({space:'letter'})
//         }
//     }
//     this.defLetter()
// }
// defSize = ()=>{
//     // olha o tempo entre inicio e fim do beep e define se é - ou .
//     if (this.state.end- this.state.start>=150){
//         if(this.state.space ==='word'){
//             this.setState({lista:[...this.state.lista,'|',' ','-']})
//         }else if(this.state.space==='letter'){
//             this.setState({lista:[...this.state.lista,' ','-']})
//         }
//         else{
//             this.setState({lista:[...this.state.lista,'-']})
//         }

//     }
//     else{
//     if(this.state.space ==='word'){
//         this.setState({lista:[...this.state.lista,'|',' ','.']})
//     }else if(this.state.space==='letter'){
//         this.setState({lista:[...this.state.lista,' ','.']})
//     }
//     else{
//         this.setState({lista:[...this.state.lista,'.']})
//     }}
//     this.setState({space:''})

// }
// defLow=()=>{
//     // fecha o audio ctx e para o som , cria outro audio context que pode ser inicializado no defHigh
//     this.audioCtx.close()
//     this.audioCtx= new (window.AudioContext || window.webkitAudioContext)();
//     this.setState({end:Date.now()})
//     this.defSize()

// }
// defLetter=()=>{
//     // olha a lista de . e - e traduz para letras baseado no obj json do state
//     var lista=this.state.lista
//     var changed_list =lista.map(obj=>obj.replace(/\s/g, ''))
//     var index =[]
//     var control =[]
//     this.setState({translate:[]})
//     changed_list.map((obj,ind) =>{
//         if (obj!=="|" && obj !==''){
//         control.push(obj)}
//         if(obj==='') {index.push(control) ,control=[]}

//     })
//     index =index.slice(1,index.length+1)
//     index =index.map(obj=> obj.join().split(',').join(''))

//     index.map((obj)=>{
//         for (var i in this.state.letras){
//             if (obj===this.state.letras[i]){
//                 this.setState({translate:[this.state.translate,i]})
//             }
//         }
//     })

// }
