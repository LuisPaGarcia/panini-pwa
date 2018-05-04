//@ts-check

import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Application extends Component {
  render() {
    return (
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          //@ts-ignore
          crossorigin="anonymous"
        />
      </Helmet>
    );
  }
}
