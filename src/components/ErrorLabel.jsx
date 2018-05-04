//@ts-check

import React, { Component } from "react";

export default class ErrorLabel extends Component {
  render() {
    const { content } = this.props;
    let ret =
      content !== "" ? (
        <label htmlFor={this.props.for}>{this.props.content}</label>
      ) : null;
    return ret;
  }
}
