import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSpeed } from "../actions/morseActions";
class Speed extends Component {
  onSubmit = e => {
    e.preventDefault();
    console.log(e.target.number.value);
    this.props.changeSpeed(e.target.number.value);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <div>
              <label>{` velocidade : ${
                this.props.morse.speed
              } ms por ponto`}</label>
            </div>

            <input
              type="number"
              name="number"
              placeholder={`${this.props.morse.speed}` + " ms"}
              //   value={this.props.morse.speed}
            />

            <input type="submit" />
          </div>
        </form>
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
