import React, { PureComponent } from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles
} from "@material-ui/core";
import * as icons from "@material-ui/icons";
import { History } from "history";
import topBarStyles, { TopBarStyles } from "./topBarStyles";

const pages = [
  { label: "Apps", path: "apps", icon: icons.Apps },
  { label: "Settings", path: "config", icon: icons.Settings }
];

interface AppBarState {
  drawerOpen: boolean;
}

class TopBar extends PureComponent<
  TopBarStyles & { history: History },
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
    if (history.location.pathname !== path) {
      history.push(path);
      this.toggleDrawer();
    }
  };
  render() {
    const {
      props: { classes },
      state: { drawerOpen },
      toggleDrawer
    } = this;
    return (
      <AppBar color="primary" className={classes.appBar}>
        <Drawer open={drawerOpen} onClose={toggleDrawer}>
          <div className={classes.list}>
            <List>
              {pages.map(({ label, path, icon: Icon }) => (
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
              ))}
            </List>
          </div>
        </Drawer>
        <Toolbar>
          <IconButton className={classes.menuIcon} onClick={toggleDrawer}>
            <icons.Menu color="action" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(topBarStyles)(TopBar);
