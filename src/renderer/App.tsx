import {
  CssBaseline,
  MuiThemeProvider,
  withStyles,
  withWidth
} from "@material-ui/core";
import { WithWidthProps } from "@material-ui/core/withWidth";
import cn from "classnames";
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
import AppsGrid from "./AppsGrid";
import { ConfigPage } from "./ConfigPage";
import DirectoryPrompt from "./DirectoryPrompt";
import styles, { AppStyles, StylesProvider, WidthProvider } from "./styles";
import theme from "./theme";
import TopBar from "./TopBar";

interface AppState {
  data: HBASApp[];
}

interface BaseAppProps {
  initialRepos: HBASApp[];
}

type AppProps = BaseAppProps & AppStyles & WithWidthProps;

export class App extends Component<AppProps, AppState> {
  state: AppState = {
    data: this.props.initialRepos
  };
  render() {
    const {
      state: { data },
      props: { classes, width }
    } = this;
    {
      const bodyClasses = cn(classes.unclickable, classes.pointer);
      const { body } = document;
      if (body.className !== bodyClasses) body.className = bodyClasses;
    }
    return (
      <Switch>
        <Route path="/main">
          {({ history }: RouteComponentProps<any>) => (
            <div style={{ paddingTop: 75 }}>
              <TopBar {...{ classes, history }} />
              <Switch>
                <Route path="/main/apps">
                  <AppsGrid directory={data} {...{ classes, width }} />
                </Route>
                <Route path="/main/config">
                  <ConfigPage {...{ classes }} />
                </Route>
              </Switch>
            </div>
          )}
        </Route>
        <Route path="/">
          <DirectoryPrompt {...{ classes }} />
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

const appRender = (props: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <UnstatedProvider>
        <StylesProvider value={props.classes}>
          <WidthProvider value={props.width}>
            <HashRouter>
              <App {...props} />
            </HashRouter>
          </WidthProvider>
        </StylesProvider>
      </UnstatedProvider>
    </CssBaseline>
  </MuiThemeProvider>
);

export default withStyles(styles)(withWidth({ resizeInterval: 10 })(appRender));
