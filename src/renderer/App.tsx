import { CssBaseline, withStyles, withWidth } from "@material-ui/core";
import { WithWidthProps } from "@material-ui/core/withWidth";
import axios from "axios";
import { AppConfig } from "common/config";
import * as fs from "fs-extra-promise";
import React, { Component } from "react";
import { Stream } from "stream";
import AppsGrid from "./AppsGrid";
import DirectoryPrompt from "./DirectoryPrompt";
import { HBASApp, HBASDirectory } from "common/HBAS";
import InfoModal from "./InfoModal";
import styles, { AppStyles, StylesProvider } from "./styles";
import TopBar from "./TopBar";
import { Provider, Subscribe } from "unstated";
import { configContainer, ConfigContainer } from "./state";
import { ipcRenderer } from "electron";
axios.defaults.adapter = require("axios/lib/adapters/http");

let repository = "https://wiiubru.com/appstore";
interface AppState {
  data: HBASDirectory | null;
  modal: HBASApp | null;
}
ipcRenderer.on("initial-config", (config: AppConfig) => {
  configContainer.setState(config);
});
type AppProps = AppStyles & WithWidthProps;

export class App extends Component<AppProps, AppState> {
  state: AppState = {
    data: null,
    modal: null
  };
  tileClick = (app: HBASApp) => {
    this.setState({
      modal: app
    });
  };
  modalClose = () => {
    this.setState({ modal: null });
  };
  handleDownload = async ({ directory, binary }: HBASApp) => {
    const appDirectory = `${configContainer.state.directory}/apps/${directory}`;
    await fs.mkdirpAsync(appDirectory);
    await Promise.all(
      ["meta.xml", "icon.png", binary].map(async (cur, i) => {
        const { data } = await axios.get<Stream>(
          `${repository}/apps/${directory}/${cur}`,
          { responseType: "stream" }
        );
        data.pipe(fs.createWriteStream(`${appDirectory}/${cur}`));
        await new Promise(res => data.once("end", res));
      })
    );
  };
  render() {
    const {
      state: { data, modal },
      props: { classes, width }
    } = this;
    return (
      <CssBaseline>
        <>
          <Subscribe to={[configContainer]}>
            {({ state }: ConfigContainer) =>
              state && state.directory ? (
                <div style={{ paddingTop: 75 }}>
                  <TopBar classes={classes} />
                  {data && (
                    <AppsGrid
                      directory={data}
                      onTileClick={this.tileClick}
                      {...{ repository, classes, width }}
                    />
                  )}
                  <InfoModal
                    info={modal}
                    classes={classes}
                    download={this.handleDownload}
                    open={!!modal}
                    onClose={this.modalClose}
                    repository={repository}
                  />
                </div>
              ) : (
                <DirectoryPrompt classes={classes} />
              )
            }
          </Subscribe>
        </>
      </CssBaseline>
    );
  }
  componentDidMount() {
    this.getRepository();
  }
  async getRepository() {
    const { data }: { data: HBASDirectory } = await axios.get(
      repository + "/directory.json"
    );
    for (const cur of data.apps) {
      cur.long_desc = cur.long_desc.replace(/\\(?:n|t|v)/g, a =>
        JSON.parse(`"${a}"`)
      );
    }
    this.setState({ data });
  }
}

const appRender = (props: AppProps) => (
  <CssBaseline>
    <Provider>
      <StylesProvider value={props.classes}>
        <App {...props} />
      </StylesProvider>
    </Provider>
  </CssBaseline>
);

export default withStyles(styles)<{}>(
  withWidth({ resizeInterval: 10 })(appRender)
);
