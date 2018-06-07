import { Button } from "@material-ui/core";
import { remote } from "electron";
import React, { Component } from "react";
import { AppClasses } from "./styles";
import { configContainer, ConfigContainer } from "./state";
import { Subscribe } from "unstated";

export default class DirectoryPrompt extends Component<{
  classes: AppClasses;
}> {
  clickHandler = (config: ConfigContainer) => async () => {
    const paths = await new Promise<string[] | void>((res, _rej) =>
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        {
          properties: ["openDirectory"]
        },
        res
      )
    );
    if (!paths) return;
    config.setState({ directory: paths[0] });
  };
  render() {
    const { classes } = this.props;
    void classes;

    return (
      <Subscribe to={[configContainer]}>
        {(config: ConfigContainer) => (
          <Button onClick={this.clickHandler(config)}>
            Choose Homebrew Directory/Drive
          </Button>
        )}
      </Subscribe>
    );
  }
}
