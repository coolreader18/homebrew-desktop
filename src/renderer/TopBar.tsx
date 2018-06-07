import React, { PureComponent } from "react";
import { AppClasses } from "./styles";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  List,
  ListItem
} from "@material-ui/core";
import * as icons from "@material-ui/icons";

interface AppBarState {
  drawerOpen: boolean;
}

export default class TopBar extends PureComponent<
  { classes: AppClasses },
  AppBarState
> {
  state: AppBarState = {
    drawerOpen: false
  };
  toggleDrawer = () => {
    this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }));
  };
  render() {
    const {
      props: { classes },
      state: { drawerOpen },
      toggleDrawer
    } = this;
    return (
      <AppBar className={classes.appBar}>
        <Drawer open={drawerOpen} onClose={toggleDrawer}>
          <div>
            <List>
              <ListItem>a</ListItem>
            </List>
          </div>
        </Drawer>
        <Toolbar>
          <IconButton className={classes.menuIcon} onClick={toggleDrawer}>
            <icons.Menu color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
