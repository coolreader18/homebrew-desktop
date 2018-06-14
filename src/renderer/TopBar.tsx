import React, { PureComponent } from "react";
import { AppStyles } from "./styles";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import * as icons from "@material-ui/icons";
import { History } from "history";

interface AppBarState {
  drawerOpen: boolean;
}

export default class TopBar extends PureComponent<
  AppStyles & { history: History },
  AppBarState
> {
  state: AppBarState = {
    drawerOpen: false
  };
  toggleDrawer = () => {
    this.setState(({ drawerOpen }) => ({ drawerOpen: !drawerOpen }));
  };
  routeSidebar = (e: React.MouseEvent<HTMLLIElement>) => {
    const path = `/main/${e.currentTarget.dataset.path}`;
    const { history } = this.props;
    if (history.location.pathname !== path) history.push(path);
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
          <div className={classes.list}>
            <List>
              {[{ label: "Apps", path: "apps", icon: icons.Apps }].map(
                ({ label, path, icon: Icon }) => (
                  <ListItem
                    button
                    onClick={this.routeSidebar}
                    data-path={path}
                    key={path}
                  >
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItem>
                )
              )}
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
