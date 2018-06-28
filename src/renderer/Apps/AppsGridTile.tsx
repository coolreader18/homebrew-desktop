import React from "react";
import { GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import * as icons from "@material-ui/icons";
import { AppsStyles } from "./appsStyles";

const AppTile = ({
  directory,
  repository,
  author,
  name,
  onClick,
  classes
}: HBASApp & AppsStyles & { onClick: React.MouseEventHandler }) => (
  <GridListTile key={directory} cols={1} rows={1}>
    <img
      src={`${repository}/apps/${directory}/icon.png`}
      className={classes.gridListImg}
      onClick={onClick}
    />
    <GridListTileBar
      title={name}
      subtitle={<span>by {author}</span>}
      actionIcon={
        <IconButton onClick={onClick}>
          <icons.Info color="secondary" />
        </IconButton>
      }
    />
  </GridListTile>
);

export default AppTile;
