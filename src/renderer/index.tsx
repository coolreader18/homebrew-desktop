import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { getRepositories } from "common/api";
import { getConfig } from "common/config";
import isDev from "common/isDev";
const baseConfig = getConfig();
require("axios").defaults.adapter = require("axios/lib/adapters/http");

if (isDev) require("electron-react-devtools").install();

if (!baseConfig.repositories) {
  baseConfig.repositories = ["https://wiiubru.com/appstore"];
}
getRepositories(...baseConfig.repositories).then(initialRepos => {
  const render = () => {
    ReactDOM.render(
      // Wrap App inside AppContainer
      <AppContainer>
        <App {...{ initialRepos }} />
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
});
