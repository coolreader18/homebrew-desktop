import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import * as icons from "@material-ui/icons";
import React, { Component } from "react";
import { AppStyles } from "./styles";
import { WithWidthProps } from "@material-ui/core/withWidth";
import InfoModal from "./InfoModal";
import cn from "classnames";
import deepEqual from "deep-equal";

export let colWidths: { [width in Breakpoint]: number } = {
  xs: 2,
  sm: 3,
  md: 3,
  lg: 4,
  xl: 4
};

type AppsGridProps = AppStyles &
  WithWidthProps & {
    directory: HBASApp[];
  };

interface AppsGridState {
  modal: HBASApp;
  modalOpen: boolean;
}

export default class AppsGrid extends Component<AppsGridProps, AppsGridState> {
  constructor(props: AppsGridProps) {
    super(props);
  }
  state: AppsGridState = {
    modal: this.props.directory[0],
    modalOpen: false
  };
  openModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const app = this.props.directory[
      ~~(e.currentTarget.dataset.index as string)
    ];
    this.setState({ modal: app, modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    const {
      props: { directory, classes, width },
      state: { modal, modalOpen }
    } = this;
    return (
      <>
        <GridList cols={colWidths[width]} className={classes.gridList}>
          {directory.map(({ directory, name, author, repository }, i) => (
            <GridListTile key={directory} cols={1} rows={1}>
              <img
                src={`${repository}/apps/${directory}/icon.png`}
                className={cn(classes.clickable, classes.gridListImg)}
                data-index={i}
                onClick={this.openModal}
              />
              <GridListTileBar
                title={name}
                subtitle={<span>by {author}</span>}
                actionIcon={
                  <IconButton data-index={i} onClick={this.openModal}>
                    <icons.Info color="secondary" />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <InfoModal
          info={modal}
          open={modalOpen}
          onClose={this.closeModal}
          {...{ classes }}
        />
      </>
    );
  }
  shouldComponentUpdate(newProps: AppsGridProps) {
    return !deepEqual(newProps.directory, this.props.directory);
  }
}
