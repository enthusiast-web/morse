import React, { Component } from 'react'
import { object } from 'prop-types';


export default class Morse extends Component {
    constructor(){
        super();
        this.audioCtx= new (window.AudioContext || window.webkitAudioContext)();
        this.state={
            start:'',
            end:'',
            space:'',
            lista:[],
            letras:{
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
                "a": ".-",
                "b": "-...",
                "c": "-.-.",
                "d": "-..",
                "e": ".",
                "f": "..-.",
                "g": "--.",
                "h": "....",
                "i": "..",
                "j": ".---",
                "k": "-.-",
                "l": ".-..",
                "m": "--",
                "n": "-.",
                "o": "---",
                "p": ".--.",
                "q": "--.-",
                "r": ".-.",
                "s": "...",
                "t": "-",
                "u": "..-",
                "v": "...-",
                "w": ".--",
                "x": "-..-",
                "y": "-.--",
                "z": "--..",
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
              translate:[]
              
        }
    }
    componentDidMount(){
        document.addEventListener("keydown",(e)=>{
           
            if(e.key !== 'Tab'&& e.key !== 'Alt'){
                this.defHigh()
            }
        })
        document.addEventListener("keyup",()=>{setTimeout(()=>  this.defLow(),50)})
        document.addEventListener("visibilitychange",()=>{
            if (document.visibilityState === "visible"){
            
                this.defLow()
            }
        })
        
    }
    defHigh=()=>{
        // cria um audio cntx e gera o espaço entre palavras ou letras baseado no tempo do final da ultima letra
        var audioCtx = this.audioCtx

        var oscillator = audioCtx.createOscillator();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        this.setState({start:Date.now()})
        if (this.state.start- this.state.end >1050){
            this.setState({space:'word'})
            
        }
        else{
            if(this.state.start- this.state.end >450){
                this.setState({space:'letter'})
            }
        }
        this.defLetter()
    }
    defSize = ()=>{ 
        // olha o tempo entre inicio e fim do beep e define se é - ou .
        if (this.state.end- this.state.start>=150){
            if(this.state.space ==='word'){
                this.setState({lista:[...this.state.lista,'|',' ','-']})
            }else if(this.state.space==='letter'){
                this.setState({lista:[...this.state.lista,' ','-']})
            }
            else{
                this.setState({lista:[...this.state.lista,'-']})
            }
            
        }
        else{  
        if(this.state.space ==='word'){
            this.setState({lista:[...this.state.lista,'|',' ','.']})
        }else if(this.state.space==='letter'){
            this.setState({lista:[...this.state.lista,' ','.']})
        }
        else{
            this.setState({lista:[...this.state.lista,'.']})
        }}
        this.setState({space:''})
        
    }
    defLow=()=>{
        // fecha o audio ctx e para o som , cria outro audio context que pode ser inicializado no defHigh
        this.audioCtx.close()
        this.audioCtx= new (window.AudioContext || window.webkitAudioContext)();
        this.setState({end:Date.now()})
        this.defSize()
       
    }   
    defLetter=()=>{
        // olha a lista de . e - e traduz para letras baseado no obj json do state
        var lista=this.state.lista
        var changed_list =lista.map(obj=>obj.replace(/\s/g, ''))
        var index =[]
        var control =[]
        this.setState({translate:[]})
        changed_list.map((obj,ind) =>{
            if (obj!=="|" && obj !==''){
            control.push(obj)}
            if(obj==='') {index.push(control) ,control=[]}
                
        })
        index =index.slice(1,index.length+1)
        index =index.map(obj=> obj.join().split(',').join(''))
        

        index.map((obj)=>{
            for (var i in this.state.letras){
                if (obj===this.state.letras[i]){
                    this.setState({translate:[this.state.translate,i]})
                }
            }
        })
     
     
    }
    render() {
        return (
            <div>
            
                <div style={{width:'100px'}} >
                    realize o codigo morse com a barra de espaço
                </div>
                <div>
                    <p style={{fontSize:55}}>
                    {this.state.lista}
                      </p>
                </div>
                
                {this.state.translate}
            </div>
        )
    }
}
