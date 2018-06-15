import {
  List,
  ListItem,
  TextField,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import React, { PureComponent } from "react";
import { AppStyles } from "./styles";
import * as icons from "@material-ui/icons";
import { Subscribe } from "unstated";
import { configContainer, ConfigContainer } from "./state";

export class ConfigPage extends PureComponent<AppStyles> {
  private getIndex(elem: HTMLElement) {
    return ~~elem.dataset.index!;
  }
  removeRepo = (e: React.MouseEvent<HTMLInputElement>) => {
    const ind = this.getIndex(e.currentTarget);

    configContainer.removeRepo(ind);
  };
  changeRepo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ind = this.getIndex(e.currentTarget.parentElement!.parentElement!);
    const val = e.target.value;

    configContainer.changeRepo(ind, val);
  };
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
                      onChange={this.changeRepo}
                      data-index={i}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={this.removeRepo} data-index={i}>
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
