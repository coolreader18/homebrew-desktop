import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { WithWidthProps } from "@material-ui/core/withWidth";
import * as icons from "@material-ui/icons";
import React, { PureComponent } from "react";
import { HBASApp, HBASDirectory } from "common/HBAS";
import { AppClasses } from "./styles";

export let colWidths: { [width in Breakpoint]: number } = {
  xs: 2,
  sm: 3,
  md: 3,
  lg: 4,
  xl: 4
};

export default class AppsGrid extends PureComponent<
  {
    directory: HBASDirectory;
    classes: AppClasses;
    repository: string;
    onTileClick: (app: HBASApp) => void;
  } & WithWidthProps
> {
  handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.onTileClick(
      this.props.directory.apps[~~(e.currentTarget.dataset.index as string)]
    );
  };
  render() {
    const { classes, repository, width } = this.props;
    return (
      <GridList cols={colWidths[width]} className={classes.gridList}>
        {this.props.directory.apps.map(({ directory, name, author }, i) => (
          <GridListTile key={directory} cols={1} rows={1}>
            <img
              src={`${repository}/apps/${directory}/icon.png`}
              className={classes.clickable}
              data-index={i}
              onClick={this.handleClick}
            />
            <GridListTileBar
              title={name}
              subtitle={<span>by {author}</span>}
              actionIcon={
                <IconButton data-index={i} onClick={this.handleClick}>
                  <icons.Info />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}
