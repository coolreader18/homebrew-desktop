import { GridList } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { WithWidthProps } from "@material-ui/core/withWidth";
import React, { PureComponent } from "react";
import AppTile from "./AppsGridTile";
import { AppsStyles } from "./appsStyles";

export const colWidths: { [width in Breakpoint]: number } = {
  xs: 2,
  sm: 3,
  md: 3,
  lg: 4,
  xl: 4
};

export default class AppsGrid extends PureComponent<
  WithWidthProps &
    AppsStyles & {
      directory: HBASApp[];
      onClick: (index: number) => React.MouseEventHandler;
    }
> {
  render() {
    const { directory, width, classes, onClick } = this.props;
    return (
      <GridList cols={colWidths[width]} className={classes.gridList}>
        {directory.map((app, i) =>
          AppTile({
            onClick: onClick(i),
            ...app,
            classes
          })
        )}
      </GridList>
    );
  }
}
