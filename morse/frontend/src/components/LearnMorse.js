import React, { Component } from 'react'

export default class LearnMorse extends Component {
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
    defRandom= ()=>{
        var rand = JSON.parse(this.state.letras)
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
