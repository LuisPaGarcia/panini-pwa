import React from "react";
import { render } from "react-dom";

// import App from "./App";
// import Principal from "./principal";
// import GridExample from "./test";
import Appx from "./Appx";
import registerServiceWorker from "./registerServiceWorker";

// render(<Principal />, document.getElementById("root"));
render(<Appx />, document.getElementById("root"));
// render(<GridExample />, document.getElementById("root"));
registerServiceWorker();
