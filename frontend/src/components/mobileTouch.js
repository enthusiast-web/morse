import React, { Component } from 'react'
import {
    defHigh,
    defLow,
   
  } from "../actions/morseActions";
  import { connect } from "react-redux";
export default class mobileTouch extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'100%'}} onClick={()=>this.props.defHigh() } >
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    morse: state.morseReducers
  });
  
  export default connect(
    mapStateToProps,
    { defHigh, defLow}
  )(Morse);
  