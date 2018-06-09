import { CssBaseline, withStyles, withWidth } from "@material-ui/core";
import { WithWidthProps } from "@material-ui/core/withWidth";
import cn from "classnames";
import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { Provider as UnstatedProvider, Subscribe } from "unstated";
import AppsGrid from "./AppsGrid";
import DirectoryPrompt from "./DirectoryPrompt";
import InfoModal from "./InfoModal";
import { configContainer, ConfigContainer } from "./state";
import styles, { AppStyles, StylesProvider, WidthProvider } from "./styles";
import TopBar from "./TopBar";

interface AppState {
  data: HBASApp[];
  modal: HBASApp;
  modalOpen: boolean;
}

interface BaseAppProps {
  initialRepos: HBASApp[];
}

type AppProps = BaseAppProps & AppStyles & WithWidthProps;

export class App extends Component<AppProps, AppState> {
  state: AppState = {
    data: this.props.initialRepos,
    modal: this.props.initialRepos[0],
    modalOpen: false
  };
  tileClick = (app: HBASApp) => {
    this.setState({
      modal: app,
      modalOpen: true
    });
  };
  modalClose = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const {
      state: { data, modal, modalOpen },
      props: { classes, width }
    } = this;
    document.body.className = cn(classes.unclickable, classes.pointer);
    return (
      <Subscribe to={[configContainer]}>
        {({ state }: ConfigContainer) =>
          state && state.directory ? (
            <div style={{ paddingTop: 75 }}>
              <TopBar classes={classes} />
              {data && (
                <AppsGrid
                  directory={data}
                  onTileClick={this.tileClick}
                  {...{ classes, width }}
                />
              )}
              <InfoModal
                info={modal}
                classes={classes}
                open={modalOpen}
                onClose={this.modalClose}
              />
            </div>
          ) : (
            <DirectoryPrompt classes={classes} />
          )
        }
      </Subscribe>
    );
  }
  async componentDidMount() {
    ipcRenderer.send("ready-to-show");
  }
}

const appRender = (props: AppProps) => (
  <CssBaseline>
    <UnstatedProvider>
      <StylesProvider value={props.classes}>
        <WidthProvider value={props.width}>
          <App {...props} />
        </WidthProvider>
      </StylesProvider>
    </UnstatedProvider>
  </CssBaseline>
);

export default withStyles(styles)<BaseAppProps>(
  withWidth({ resizeInterval: 10 })(appRender)
);
