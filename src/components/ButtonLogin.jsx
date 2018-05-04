//@ts-check
import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${props => (props.disabled ? "blue" : "green")};
  border: none;
  color: ${props => (props.disabled ? "gray" : "green")};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

export default class ButtonLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTap = this.handleTap.bind(this);
  }

  handleTap() {
    console.log("tap!");
  }

  render() {
    return (
      <Button type="submit" value="Login" disabled={this.props.disabled}>
        Tap me
      </Button>
    );
  }
}
