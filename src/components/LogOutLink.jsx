import React, { Component } from "react";
import Link, { navigateTo } from "gatsby-link";

export default class LogOutLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link
        to=""
        onClick={() => {
          try {
            localStorage.removeItem("TOKEN");
            this.props.updateParent();
          } catch (error) {
            console.log(error);
            this.props.updateParent();
          }
        }}
      >
        Log out
      </Link>
    );
  }
}
