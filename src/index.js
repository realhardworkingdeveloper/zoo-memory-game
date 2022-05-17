import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import * as buffer from "buffer";
window.Buffer = buffer.Buffer; // https://github.com/isaacs/core-util-is/issues/27#issuecomment-878969583

// import "bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
