import {
  List,
  ListItem,
  TextField,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
  withStyles
} from "@material-ui/core";
import React, { PureComponent } from "react";
import * as icons from "@material-ui/icons";
import { Subscribe } from "unstated";
import { configContainer, ConfigContainer } from "../state";
import configStyles, { ConfigStyles } from "./configStyles";

class Config extends PureComponent<ConfigStyles> {
  removeRepo(ind: number) {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      configContainer.removeRepo(ind);
    };
  }
  changeRepo(ind: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const val = e.currentTarget.value;

      configContainer.changeRepo(ind, val);
    };
  }
  private validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Subscribe to={[configContainer]}>
        {({ addRepo, state: { repositories } }: ConfigContainer) => (
          <div>
            <div className={classes.reposList}>
              <List
                subheader={
                  <ListSubheader>
                    Repositories
                    <ListItemSecondaryAction>
                      <IconButton onClick={addRepo}>
                        <icons.AddCircle />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListSubheader>
                }
              >
                {repositories.map(({ repo, key }, i) => (
                  <ListItem key={key}>
                    <TextField
                      error={!this.validateUrl(repo)}
                      type="url"
                      defaultValue={repo}
                      onChange={this.changeRepo(i)}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={this.removeRepo(i)}>
                        <icons.RemoveCircle />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default withStyles(configStyles)(Config);
