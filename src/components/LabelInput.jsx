//@ts-check
import React, { Component } from "react";
import Head from "../components/Head";

export default class LabelInput extends Component {
  //@ts-ignore
  render() {
    const { idx, labelText } = this.props;
    return (
      <label htmlFor={idx} id={idx + `-label`}>
        {labelText} <br />
      </label>
    );
  }
}
