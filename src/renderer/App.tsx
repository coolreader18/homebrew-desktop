import { CssBaseline, MuiThemeProvider, withWidth } from "@material-ui/core";
import { WithWidthProps } from "@material-ui/core/withWidth";
import { ipcRenderer } from "electron";
import imagesLoaded from "imagesloaded";
import React, { Component } from "react";
import {
  HashRouter,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import "typeface-roboto/index.css";
import { Provider as UnstatedProvider } from "unstated";
import Apps from "./Apps/Apps";
import Config from "./Config/Config";
import DirectoryPrompt from "./DirectoryPrompt";
import { WidthProvider } from "./width";
import theme from "./theme";
import TopBar from "./TopBar/TopBar";

interface AppState {
  data: HBASApp[];
}

type AppProps = WithWidthProps & {
  initialRepos: HBASApp[];
};

/**
 * The root component of the app
 */
export class App extends Component<AppProps, AppState> {
  state: AppState = {
    data: this.props.initialRepos
  };
  render() {
    const {
      state: { data },
      props: { width }
    } = this;
    return (
      <Switch>
        <Route path="/main">
          {({ history }: RouteComponentProps<any>) => (
            <div style={{ paddingTop: 75 }}>
              <TopBar {...{ history }} />
              <Switch>
                <Route path="/main/apps">
                  <Apps directory={data} {...{ width }} />
                </Route>
                <Route path="/main/config">
                  <Config />
                </Route>
              </Switch>
            </div>
          )}
        </Route>
        <Route path="/">
          <DirectoryPrompt />
        </Route>
      </Switch>
    );
  }
  componentDidMount() {
    imagesLoaded(document.querySelector("#app")!, () => {
      ipcRenderer.send("ready-to-show");
    });
  }
}

/**
 * The App component wrapped in a bunch of providers.
 */
const appRender = (props: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <UnstatedProvider>
        <WidthProvider value={props.width}>
          <HashRouter>
            <App {...props} />
          </HashRouter>
        </WidthProvider>
      </UnstatedProvider>
    </CssBaseline>
  </MuiThemeProvider>
);

export default withWidth({ resizeInterval: 10 })(appRender);
