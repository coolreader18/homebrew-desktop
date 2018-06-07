import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Add this import:
// ReactDOM.render(<App />, document.getElementById("app"));
// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("app")
  );
};

// // Render once
render();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./App", render);
}
