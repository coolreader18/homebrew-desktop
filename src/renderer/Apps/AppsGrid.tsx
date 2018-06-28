import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { WithWidthProps } from "@material-ui/core/withWidth";
import * as icons from "@material-ui/icons";
import pureFunction from "common/pure-functional-component";
import React from "react";
import { AppsStyles } from "./appsStyles";

export const colWidths: { [width in Breakpoint]: number } = {
  xs: 2,
  sm: 3,
  md: 3,
  lg: 4,
  xl: 4
};

export default pureFunction<
  WithWidthProps &
    AppsStyles & {
      directory: HBASApp[];
      onClick: (index: number) => React.MouseEventHandler;
    }
>(
  ({ directory, width, classes, onClick: click }) => (
    <GridList cols={colWidths[width]} className={classes.gridList}>
      {directory.map(({ directory, repository, author, name }, i) => {
        const onClick = click(i);
        return (
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
      })}
    </GridList>
  ),
  "AppsGrid"
);
