import React, { Component } from "react";
import Link, { navigateTo } from "gatsby-link";

export default class LogInLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        to=""
        onClick={() => {
          localStorage.setItem("TOKEN", "TOKEN_");
        }}
      >
        Log in
      </Link>
    );
  }
}
