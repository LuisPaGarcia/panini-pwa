//@ts-check
import React, { Component } from "react";
import ErrorLabel from "./ErrorLabel";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const PASSWORD = "password",
  TEXT = "text",
  EMAIL = "email";

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "" };
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnLostFocus = this.handleOnLostFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  handleOnFocus(event) {
    console.log(`focus on ${event.target.id}`);
  }

  handleOnLostFocus(event) {
    console.log(`lost focus on ${event.target.id}`);
  }
  //@ts-ignore
  handleChange = event => {
    let id = event.target.type == PASSWORD ? PASSWORD : EMAIL;

    let object = { [id]: event.target.value };
    this.setState(object, () => {
      console.log(object);
      this.props.parent(object);
    });
  };

  render() {
    const { idx, typex, labelText, placeholderx, use } = this.props;
    return (
      <div>
        <Input
          id={use + `-` + idx}
          type={typex}
          placeholder={placeholderx}
          autoComplete="off"
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnLostFocus}
          onChange={this.handleChange}
          key={idx + `-key`}
        />
      </div>
    );
  }
}
