//@ts-check

import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Application extends Component {
  render() {
    return (
      <Helmet>
        <meta charSet="utf-8" />
        <title>{this.props.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <link
          rel="icon"
          href="http://oflisback.github.io/react-favicon/public/img/github.ico"
        />
      </Helmet>
    );
  }
}
