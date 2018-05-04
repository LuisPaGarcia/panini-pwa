//@ts-check
import React, { Component } from "react";
import InputField from "./InputField";
import ErrorLabel from "./ErrorLabel";
import { isObject } from "util";
import Head from "./Head";
import LabelInput from "./LabelInput";
import ButtonLogin from "./ButtonLogin";
import {
  CSS__LOGIN__PARENT,
  CSS__LOGIN__CHILD,
  CSS__LABEL__ID,
  CSS__INPUT__TEXT,
  CSS__BUTTON
} from "../styles/styles";

export default class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", isLogged: false, isDisable: true };
    this.updateState = this.updateState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateState(object) {
    this.setState(object, () => {
      const { email, password } = this.state;
      let disableButton = null;
      disableButton = email !== "" && password !== "" ? false : true;
      this.setState({ isDisable: disableButton });
    });
  }

  //@ts-ignore
  handleSubmit = event => {
    this.state.isDisable = true;

    if (true) {
      if (typeof localStorage !== "undefined") {
        this.setState({ isLogged: true }, () => {
          this.props.parentUpdate();
          localStorage.setItem("TOKEN", "TOKEN_");
        });
      }
    }
    this.state.isDisable = false;
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <Head title="Hey" />
        <div style={CSS__LOGIN__PARENT}>
          <form onSubmit={this.handleSubmit} style={CSS__LOGIN__CHILD}>
            {/* {this.state.value} */}

            {/* <LabelInput labelText="Email" idx="email" /> */}
            <InputField
              primary
              use="login"
              idx="email"
              typex="text"
              labelText="Email:"
              placeholderx="Email"
              parent={this.updateState}
            />

            <ErrorLabel content="" id={`email` + `-label-error`} for="email" />

            {/* <LabelInput labelText="Password" idx="password" /> */}
            <InputField
              primary
              use="login"
              idx="password"
              typex="password"
              labelText="Password:"
              placeholderx="Password"
              parent={this.updateState}
            />

            <ErrorLabel
              content=""
              id={`password` + `-label-error`}
              for="password"
            />
            <ButtonLogin value="Login" disabled={this.state.isDisable} />
          </form>
        </div>
      </div>
    );
  }
}
