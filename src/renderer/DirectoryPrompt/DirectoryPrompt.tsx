import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  withStyles
} from "@material-ui/core";
import cx from "classnames";
import { remote } from "electron";
import React, { PureComponent } from "react";
import { Redirect } from "react-router";
import { Subscribe } from "unstated";
import { configContainer, ConfigContainer } from "../state";
import directoryPromptStyles, {
  DirectoryPromptStyles
} from "./directoryPromptStyles";

interface DirectoryPromptState {
  ftpDialog: boolean;
}

class DirectoryPrompt extends PureComponent<
  DirectoryPromptStyles,
  DirectoryPromptState
> {
  state: DirectoryPromptState = { ftpDialog: false };

  setHost = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {};

  dirClick = async () => {
    const paths = await new Promise<string[] | void>(res =>
      remote.dialog.showOpenDialog(
        remote.getCurrentWindow(),
        { properties: ["openDirectory"] },
        res
      )
    );
    if (!paths) return;
    configContainer.setState({ directory: { type: "dir", path: paths[0] } });
  };

  ftpClick = () => this.setState({ ftpDialog: true });
  ftpClose = () => this.setState({ ftpDialog: false });
  ftpOK = () => {
    this.ftpClose();
    configContainer.setState({
      directory: { type: "ftp", host: this.ftpHost, port: this.ftpPort }
    });
  };
  ftpHost: string = "";
  ftpPort?: number = void 0;

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flexBase}>
        <Button onClick={this.dirClick}>Choose Homebrew Directory/Drive</Button>
        <Button onClick={this.ftpClick}>Connect to FTPiiU</Button>

        <Dialog open={this.state.ftpDialog} onClose={this.ftpClose}>
          <DialogTitle>Connect to FTPiiU</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the IP address of your Wii U (it should show up when you
              start FTPiiU) and the port, which defaults to 21.
            </DialogContentText>
            <div className={classes.flex}>
              <TextField
                margin="dense"
                onChange={({ target: { value } }) => (this.ftpHost = value)}
                autoFocus
                className={cx(classes.textField, classes.hostField)}
                label="Host"
              />
              <TextField
                margin="dense"
                onChange={({ target: { value } }) => {
                  if (value) this.ftpPort = parseInt(value);
                  else this.ftpPort = void 0;
                }}
                type="number"
                defaultValue="21"
                className={cx(classes.textField, classes.ipField)}
                label="Port"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.ftpClose}>Cancel</Button>
            <Button onClick={this.ftpOK}>OK</Button>
          </DialogActions>
        </Dialog>

        <Subscribe to={[configContainer]}>
          {({ state: { directory } }: ConfigContainer) =>
            directory ? <Redirect to="/main/apps" /> : null
          }
        </Subscribe>
      </div>
    );
  }
}

export default withStyles(directoryPromptStyles)(DirectoryPrompt);
