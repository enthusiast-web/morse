import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSpeed } from "../actions/morseActions";
class Speed extends Component {
  onChange = e => {
    console.log(e.target);
    this.props.changeSpeed(e.target.value);
  };
  render() {
    return (
      <div>
        <div>
          <div className="input-group">
            <label>{` velocidade : ${
              this.props.morse.speed
            } ms por ponto`}</label>
          </div>

          <input
            onChange={this.onChange}
            type="number"
            name="number"
            value={this.props.morse.speed}
            placeholder={`${this.props.morse.speed}` + " ms"}
          />
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
  { changeSpeed }
)(Speed);
