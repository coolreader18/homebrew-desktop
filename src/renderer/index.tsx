import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { getRepositories } from "common/api";
import isDev from "common/isDev";
import { configContainer } from "./state";
require("axios").defaults.adapter = require("axios/lib/adapters/http");

if (isDev) require("electron-react-devtools").install();

(async () => {
  const baseConfig = configContainer.state;
  if (!baseConfig.repositories) {
    await configContainer.setState({
      repositories: [
        { repo: "https://wiiubru.com/appstore", key: Math.random().toString() }
      ]
    });
  }
  const initialRepos = await getRepositories(...baseConfig.repositories);
  const render = () => {
    ReactDOM.render(
      // Wrap App inside AppContainer
      <AppContainer>
        <App {...{ initialRepos }} />
      </AppContainer>,
      document.getElementById("app")
    );
  };

  // Render once
  render();

  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept("./App", render);
  }
})();
