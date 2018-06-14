import { Button } from "@material-ui/core";

import { remote } from "electron";
import React, { PureComponent } from "react";
import { configContainer, ConfigContainer } from "./state";
import { AppStyles } from "./styles";
import { Subscribe } from "unstated";
import { Redirect } from "react-router";

export default class DirectoryPrompt extends PureComponent<AppStyles> {
  clickHandler = async () => {
    const paths = await new Promise<string[] | void>(res =>
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        { properties: ["openDirectory"] },
        res
      )
    );
    if (!paths) return;
    configContainer.setState({ directory: paths[0] });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flexBase}>
        <Button onClick={this.clickHandler}>
          Choose Homebrew Directory/Drive
        </Button>
        <Subscribe to={[configContainer]}>
          {({ state: { directory } }: ConfigContainer) =>
            directory && <Redirect to="/main/apps" />
          }
        </Subscribe>
      </div>
    );
  }
}
