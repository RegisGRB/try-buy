import React from "react";
import ReactDOM from "react-dom";

import { ContextContainer } from "./context";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Router from "./layouts/Router";
import Enav from "./components/NavBar/ENav";
import CFooter from "./components/Footer/CFooter";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <ContextContainer>
      <Router>
        <App></App>
      </Router>
    </ContextContainer>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
